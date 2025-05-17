// src/app/api/listings/route.ts

import { getServerSession } from 'next-auth';
import { prisma } from '../../../../prisma/prisma'; // Adjust the import based on your prisma setup
import { options } from '../auth/[...nextauth]/options'; // Adjust the import based on your project structure
import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16' as any,
});

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(options);
  const { id } = await req.json();

  console.log('Deleting product with ID:', id); // Log the ID

  try {
    // Find the product in the database to get its Stripe Product ID
    const product = await prisma.post.findUnique({
      where: { id },
    });

    console.log('Product found in database:', product); // Log the product details

    if (!product || !product.stripeProductId) {
      console.error('Product not found or Stripe Product ID missing');
      return NextResponse.json({ message: "Product not found" }, { status: 400 });
    }

    // Step 1: Check for and delete associated prices from Stripe
    const prices = await stripe.prices.list({
      product: product.stripeProductId,
    });

    await stripe.products.update(product.stripeProductId, {
      active: false
    });

    // Step 3: Delete the product from the database
    console.log('Deleting product from database');
    await prisma.post.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error during product deletion:', error); // Log any errors

     // Error handling
     if (error instanceof Error) {
      // If error is an instance of Error, handle the message properly
      return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
    }

    // Default error response if error is not an instance of Error
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(options);

  const { title, description, price, imageUrl } = await req.json();

  try {
    // Now, create the Product and link it to the Price
    const stripeProduct = await stripe.products.create({
      name: title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
      default_price_data: {
        unit_amount: price * 100,
        currency: "usd",
      },
    });

    // Create the Price object first
    const priceObject = await stripe.prices.create({
      product: stripeProduct.id,
      currency: 'usd', // Set currency (e.g., USD)
      unit_amount: price * 100, // Convert price to cents (e.g., $10 becomes 1000)
    });

    // Step 3: Link the Price to the Product by updating the product with the default_price
    await stripe.products.update(stripeProduct.id, {
      default_price: priceObject.id, // Link the price to the product
    });

    // Save the created Product and Price details in your Prisma database
    const newListing = await prisma.post.create({
      data: {
        title,
        description,
        imageUrl,
        price,
        authorEmail: session?.user?.email as string,
        authorName: session?.user?.name as string,
        stripeProductId: stripeProduct.id, // Save the Stripe Product ID
        stripePriceId: priceObject.id,     // Save the Stripe Price ID
      },
    });

    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error); // Log any errors
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
