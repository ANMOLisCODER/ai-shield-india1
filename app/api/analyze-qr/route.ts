import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {

    const { qrContent } = await req.json();

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: `
You are a cybersecurity expert.

Analyze QR content.

Return ONLY JSON.
If QR content starts with:

upi://pay

Then treat it as a UPI payment QR.

Do NOT automatically mark it as scam.

If payee name exists and UPI format is valid:
riskScore should normally be between 0-30.

Only increase risk score if:
- suspicious UPI ID
- random characters
- fake bank names
- impersonation attempt

{
  "riskScore": 90,
  "verdict": "SCAM",
  "reasons": [
    "reason1",
    "reason2"
  ],
  "advice": [
    "advice1",
    "advice2",
    "advice3"
  ]
}
`
          },

          {
            role: "user",
            content: qrContent,
          },
        ],
      });

    const text =
      completion.choices[0].message.content || "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    await supabase
  .from("scan_history")
  .insert([
    {
      scan_type: "QR",
      content: qrContent,
      verdict: parsed.verdict,
      risk_score: parsed.riskScore,
      created_at: new Date().toISOString(),
    },
  ]);

    return NextResponse.json({
      result: parsed,
    });

  } catch (error: any) {

    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}