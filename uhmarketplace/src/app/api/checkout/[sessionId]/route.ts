import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any,
});

export async function GET(req: Request, { params }: { params: { sessionId: string } }) {
  try {
    const session = await stripe.checkout.sessions.retrieve(params.sessionId);
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}
