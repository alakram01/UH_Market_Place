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

  try{
    // Find the product in the database to get its Stripe Product ID
    const product = await prisma.post.findUnique({
      where: {id},
    });

    if (!product || !product.stripeProductId){
      return NextResponse.json({message: "Product not found"}, {status: 400})
    }

    // Delete the product from Stripe
    await stripe.products.del(product.stripeProductId);

    // Delete product from Database 
    await prisma.post.delete({
      where: {id}
    })
  

    return NextResponse.json({ message: 'Product deleted successfully'}, {status:200})
  } catch (error) {
    return NextResponse.json({message: 'Internal server error'}, {status: 500});
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

