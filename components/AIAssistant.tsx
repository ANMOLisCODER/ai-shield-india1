"use client";

import { useState } from "react";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");

  const [loading, setLoading] = useState(false);

  const askAI = async (question?: string) => {
    const finalQuestion = question || message;

    if (!finalQuestion.trim()) return;

    try {
      setLoading(true);

      const response = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: finalQuestion,
        }),
      });

      const data = await response.json();

      setReply(data.reply);

      if (!question) setMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full
        bg-cyan-500 text-3xl text-black shadow-[0_0_40px_#06b6d4]
        transition-all duration-300 hover:scale-110 active:scale-95
        ${open ? "rotate-180" : "rotate-0"}`}
      >
        🤖
      </button>

      {/* Assistant */}

      <div
        className={`fixed bottom-24 right-6 z-50 w-[390px]
        transition-all duration-300 ease-out

        ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-8 scale-95 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#0b1225]/95 backdrop-blur-2xl shadow-[0_0_40px_rgba(6,182,212,.25)]">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

            <div>

              <h2 className="text-2xl font-bold text-cyan-400">
                🤖 AI Shield Assistant
              </h2>

              <p className="text-sm text-gray-400">
                Cyber Safety Expert
              </p>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-lg bg-red-500/20 px-3 py-1 text-red-400 transition hover:bg-red-500/30"
            >
              ✕
            </button>

          </div>

          {/* Chat */}

          <div className="p-6">

            <div className="mb-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4 leading-7 text-gray-300">

              {reply ||
                "👋 Hello! I'm AI Shield Assistant. Ask me anything about cyber security, scams, phishing, QR fraud, UPI fraud or online safety."}

            </div>

            {/* Quick Buttons */}

            <div className="mb-5 grid gap-3">

              {[
                "What is phishing?",
                "How to avoid OTP scams?",
                "QR fraud kya hai?",
                "How to report cybercrime?",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => askAI(item)}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-left transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-500/10"
                >
                  {item}
                </button>
              ))}

            </div>

            {/* Input */}

            <div className="flex gap-2">

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none transition focus:border-cyan-400"
              />

              <button
                onClick={() => askAI()}
                className="rounded-xl bg-cyan-500 px-5 font-bold text-black transition hover:scale-105 active:scale-95"
              >
                Send
              </button>

            </div>

            {/* Loading */}

            {loading && (

              <div className="mt-4 flex items-center gap-3">

                <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400"></div>

                <p className="text-cyan-300">
                  AI is thinking...
                </p>

              </div>

            )}

          </div>

        </div>
      </div>
    </>
  );
}