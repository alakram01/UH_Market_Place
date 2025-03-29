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

    if (prices.data.length > 0) {
      // If there are associated prices, archive them first
      console.log('Archiving associated prices for product:', product.stripeProductId);
      for (const price of prices.data) {
        await stripe.prices.update(price.id, {
          active: false, // Archive the price
        });
        console.log('Archived price with ID:', price.id);
      }
    } else {
      console.log('No associated prices found for this product');
    }

    // Step 2: Attempt to delete the product from Stripe
    console.log('Deleting product from Stripe with ID:', product.stripeProductId);
    await stripe.products.del(product.stripeProductId);

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

  const {title, description, price, imageUrl} = await req.json();

  try {

    const stripeProduct = await stripe.products.create({
      name:title,
      description: description,
      images: imageUrl ? [imageUrl] : [],
      default_price_data: {
        unit_amount: price * 100,
        currency: "usd",
      },
    });

    const newListing = await prisma.post.create({
      data: {
        title,
        description,
        imageUrl,
        price,
        authorEmail: session?.user?.email as string,
        authorName: session?.user?.name as string,
        stripeProductId: stripeProduct.id
      },
    });

    return NextResponse.json(newListing, {status: 201});
  } catch (error) {
    return NextResponse.json({message: 'Internal server error'}, {status: 500});
  }
}

