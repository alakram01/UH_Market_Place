import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any,
});

export async function GET(req: Request, { params }: { params: { sessionId: string } }) {
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(params.sessionId);
    return NextResponse.json(lineItems);
  } catch (error) {
    return NextResponse.json({ error: "Line items not found" }, { status: 404 });
  }
}
