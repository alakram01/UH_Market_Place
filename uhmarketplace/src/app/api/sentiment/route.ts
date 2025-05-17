import { NextResponse } from 'next/server';
import openai from '@/utils/openai';

export async function POST() {
  try {
    // your OpenAI call…
    const response = await openai.responses.create({
      // model: 'gpt-4.1-nano',
      // instructions:"give a json response with three things tone, positivity_score, and a productrecommendation. Details, tone: only give one word,eg neutral, negative, happy or sad etc. Positivity_score: from 1-10 10 means most postive and 1 means most negative. Product_recommendation: that help the user in terms of mental health or proudctivty, it should be a product a user can buy. Make sure json reponse is clean with no unnesseary characters. the input that i will give you would in form of question and answers, so becareful if some one ask a question instead of answering, just try to assess the three things I told you to do, if cannot decipher anything then by default your response you should unknown for tone, 5 for positivty score and none for product recommendation",
      // input: 'my day was alrightToday I spent the morning catching up on code reviews for the marketplace app, then dove into building the AI “Check‑In Bot” feature—wrote the TypeScript logic and tested my Prisma queries. After lunch, I mapped out the user flow for reflections and fixed a bug in the Next.js frontend. Late afternoon was dedicated to researching vehicle re‑identification techniques and planning my next steps. Wrapped up by reviewing tomorrow’s tasks and jotting down notes on performance optimizations.',
      
      model: "gpt-4.1-mini",
      tools: [ { type: "web_search_preview" } ],
      instructions: "return a json object, 3 most important news, summarize each news in max 3 sentences",
      input: "news about houston on X(formerly twitter) today by credible sources, I am not asking about X intself but the news on X",
    });
    
    
    return  NextResponse.json(response.output_text)
  } catch (err:any) {
    if (err.code === 'insufficient_quota' || err.status === 429) {
      return NextResponse.json({ error: 'Service temporarily unavailable. Please try again later.' });
    }
    throw err;
  }
    
      
  return NextResponse.json({ message: 'Hello Things are good!' });
}

