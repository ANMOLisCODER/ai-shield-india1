import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are India's best cyber security AI.

Analyze the user's message.

Return ONLY valid JSON.

Example:

{
  "riskScore": 90,
  "verdict": "SCAM",
  "reasons": [
    "Suspicious banking link detected",
    "Creates urgency to scare user"
  ],
  "advice": [
    "Do not click the link",
    "Contact bank directly",
    "Report the message"
  ]
}

Rules:
- verdict must be SAFE, SUSPICIOUS or SCAM
- minimum 2 reasons
- minimum 3 advice points
- JSON only
- no markdown
- no explanation
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const result =
      completion.choices[0].message.content || "{}";

    const analysis = JSON.parse(result);

    // SAVE TO SUPABASE
    const { error } = await supabase
      .from("scan_history")
      .insert([
        {
          scan_type: "TEXT",
          content: message,
          verdict: analysis.verdict,
          risk_score: analysis.riskScore,
        },
      ]);

    if (error) {
      console.error("Supabase Error:", error);
    }

    return NextResponse.json({
      result,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Analysis Failed",
      },
      {
        status: 500,
      }
    );
  }
}