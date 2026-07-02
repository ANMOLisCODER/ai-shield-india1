import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",
              content: `
You are AI Shield India Assistant.

You help Indian users stay safe from:

- OTP scams
- UPI scams
- QR fraud
- Phishing
- Fake jobs
- KYC scams
- Banking fraud
- Cybercrime

Keep answers short.
Use simple language.
Give practical advice.
`,
            },

            {
              role: "user",
              content: message,
            },
          ],

          temperature: 0.4,
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't answer that.";

    return NextResponse.json({
      reply,
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        error:
          error?.message || "Chat Failed",
      },
      {
        status: 500,
      }
    );

  }
}