import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are a cyber reputation analysis expert.

Analyze phone numbers, emails, websites and UPI IDs.

Return ONLY valid JSON.

Example:

{
  "riskScore": 85,
  "verdict": "SUSPICIOUS",
  "reasons": [
    "Identifier resembles common scam patterns",
    "Trustworthiness cannot be verified"
  ],
  "advice": [
    "Verify identity independently",
    "Do not share OTP",
    "Avoid financial transactions"
  ]
}

Rules:

- verdict must be SAFE, SUSPICIOUS or SCAM
- minimum 2 reasons
- minimum 3 advice points
- JSON only
- no markdown
`
        },
        {
          role: "user",
          content: input,
        },
      ],
    });
const parsed = JSON.parse(
  completion.choices[0].message.content || "{}"
);

await supabase
  .from("scan_history")
  .insert([
    {
      scan_type: "REPUTATION",
      content: input,
      verdict: parsed.verdict,
      risk_score: parsed.riskScore,
      created_at: new Date().toISOString(),
    },
  ]);
    return NextResponse.json({
  result: JSON.stringify(parsed),
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Reputation Analysis Failed" },
      { status: 500 }
    );
  }
}