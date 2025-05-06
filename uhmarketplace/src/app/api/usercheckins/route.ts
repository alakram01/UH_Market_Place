// app/api/checkin/route.ts

import { NextResponse } from 'next/server';
import openai from '@/utils/openai';
import { prisma } from "../../../../prisma/prisma";

export async function POST(req: Request) {
  // 1) Parse incoming JSON
  const {
    email,
    question1, answer1,
    question2, answer2,
    question3, answer3,
    personalNote
  } = await req.json();

  // 2) Build the AI input from the questions & answers
  const aiInput = `
Q1: ${question1}
A1: ${answer1}

Q2: ${question2}
A2: ${answer2}

Q3: ${question3}
A3: ${answer3}

Note: ${personalNote}
  `.trim();

  // 3) Call your AI endpoint
  let aiPayload: { tone: string | null; positivity_score: number | null; productrecommendation: string | null };
  try {
    const response = await openai.responses.create({
      model: 'gpt-4.1-nano',
      instructions: `
Return a clean JSON object with exactly these three properties:
  - tone: one-word sentiment (e.g. neutral, negative, happy, sad)
  - positivity_score: integer from 1–10 (1 most negative, 10 most positive)
  - productrecommendation: a single product a user could buy to make the situation better

Assess only from the Q/A and note.  
If you cannot parse a value, default to:
  tone: "unknown"
  positivity_score: 5
  productrecommendation: "none"
      `.trim(),
      input: aiInput
    });

    // the SDK returns the assistant text in `output_text`
    const raw = response.output_text as string;
    try {
      aiPayload = JSON.parse(raw);
    } catch {
      // fallback defaults
      aiPayload = { tone: null, positivity_score: null, productrecommendation: null };
    }
  } catch (err: any) {
    if (err.code === 'insufficient_quota' || err.status === 429) {
      return NextResponse.json(
        { error: 'AI service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }
    throw err;
  }

  // 4) Insert into the database
  const checkIn = await prisma.userCheckIns.create({
    data: {
      email,
      question1, answer1,
      question2, answer2,
      question3, answer3,
      personalNote,
      sentimentLabel: aiPayload.tone,
      sentimentScore: aiPayload.positivity_score,
      productRec: aiPayload.productrecommendation
    }
  });

  // 5) Return the new record
  return NextResponse.json(checkIn);
}
