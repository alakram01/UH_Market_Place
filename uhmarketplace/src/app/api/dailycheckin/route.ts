import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); // Get data from the request body
    
    // Log the received data for testing
    console.log("Received data:", data);
    
    // Send a response back to confirm receipt of data
    return NextResponse.json({ message: 'Data received successfully!', data });
  } catch (error) {
    console.error("Error receiving data:", error);
    return NextResponse.json({ error: 'Failed to receive data.' }, { status: 400 });
  }
}
