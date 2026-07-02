"use client";

import { useState } from "react";
import ScamResultCard from "./ScamResultCard";

export default function ReputationChecker() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const checkReputation = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/analyze-reputation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
        }),
      });

      const data = await response.json();

      setAnalysis(JSON.parse(data.result));
    } catch (error) {
      console.error(error);
      alert("Reputation Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

      <h2 className="mb-4 text-3xl font-bold">
        🛡 Reputation Checker
      </h2>

      <p className="mb-8 text-gray-400">
        Check phone numbers, emails, websites and UPI IDs before trusting them.
      </p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter phone number, email, website or UPI ID..."
        className="w-full rounded-2xl border border-white/10 bg-[#0b1225] p-5 text-lg outline-none focus:border-cyan-500"
      />

      <button
        onClick={checkReputation}
        className="mt-6 rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
      >
        {loading ? "Analyzing..." : "Check Reputation"}
      </button>

      {analysis && (
        <ScamResultCard analysis={analysis} />
      )}

    </div>
  );
}