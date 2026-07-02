"use client";

import { useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import VoiceDetector from "../../components/VoiceDetector";
import QRScanner from "../../components/QRScanner";
import URLScanner from "../../components/URLScanner";
import ReputationChecker from "../../components/ReputationChecker";
import ScamResultCard from "../../components/ScamResultCard";

export default function ScamToolsPage() {
  const [activeTab, setActiveTab] = useState("text");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 pt-28 text-white">      <div className="mx-auto max-w-7xl">

        <h1 className="mb-3 text-center text-6xl font-bold">
          Scam Detection Tools
        </h1>

        <p className="mb-12 text-center text-xl text-gray-400">
          Protect yourself from scams using AI powered tools.
        </p>

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">

          <button
            onClick={() => setActiveTab("text")}
            className={`rounded-full px-6 py-3 font-semibold transition ${
              activeTab === "text"
                ? "bg-cyan-500 text-black"
                : "border border-white/20 text-white hover:border-cyan-500"
            }`}
          >
            📝 Text Scam
          </button>

          <button
            onClick={() => setActiveTab("image")}
            className={`rounded-full px-6 py-3 font-semibold transition ${
              activeTab === "image"
                ? "bg-cyan-500 text-black"
                : "border border-white/20 text-white hover:border-cyan-500"
            }`}
          >
            🖼 Image Scanner
          </button>

          <button
            onClick={() => setActiveTab("voice")}
            className={`rounded-full px-6 py-3 font-semibold transition ${
              activeTab === "voice"
                ? "bg-cyan-500 text-black"
                : "border border-white/20 text-white hover:border-cyan-500"
            }`}
          >
            🎤 Voice Detector
          </button>

          <button
            onClick={() => setActiveTab("url")}
            className={`rounded-full px-6 py-3 font-semibold transition ${
              activeTab === "url"
                ? "bg-cyan-500 text-black"
                : "border border-white/20 text-white hover:border-cyan-500"
            }`}
          >
            🔗 URL Scanner
          </button>

          <button
            onClick={() => setActiveTab("qr")}
            className={`rounded-full px-6 py-3 font-semibold transition ${
              activeTab === "qr"
                ? "bg-cyan-500 text-black"
                : "border border-white/20 text-white hover:border-cyan-500"
            }`}
          >
            📱 QR Scanner
          </button>

          <button
            onClick={() => setActiveTab("reputation")}
            className={`rounded-full px-6 py-3 font-semibold transition ${
              activeTab === "reputation"
                ? "bg-cyan-500 text-black"
                : "border border-white/20 text-white hover:border-cyan-500"
            }`}
          >
            🛡 Reputation
          </button>

        </div>

        {/* TEXT */}
        {activeTab === "text" && (
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

            <h2 className="mb-4 text-3xl font-bold">
              📝 Text Scam Detector
            </h2>

            <p className="mb-6 text-gray-400">
              Paste suspicious SMS, WhatsApp messages or emails and let AI analyze them.
            </p>


<textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Paste suspicious message here..."
  className="h-48 w-full rounded-2xl border border-white/10 bg-[#0b1225] p-5 text-lg outline-none focus:border-cyan-500"
/>

<button
  onClick={async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/analyze-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      setAnalysis(JSON.parse(data.result));
    } catch (error) {
      console.error(error);
      setResult("Analysis Failed");
    } finally {
      setLoading(false);
    }
  }}
  className="mt-6 rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold text-black transition hover:scale-105"
>
  {loading ? "Analyzing..." : "Analyze Message"}
</button>
{analysis && (
  <ScamResultCard analysis={analysis} />
)}


          </div>
        )}

        {/* IMAGE */}
        {activeTab === "image" && (
          <div className="mt-12">
            <ImageUploader />
          </div>
        )}

        {/* VOICE */}
        {activeTab === "voice" && (
          <div className="mt-12">
            <VoiceDetector />
          </div>
        )}

        {/* URL */}
        {activeTab === "url" && (
          <div className="mt-12">
            <URLScanner />
          </div>
        )}

        {/* QR */}
        {activeTab === "qr" && (
          <div className="mt-12">
            <QRScanner />
          </div>
        )}

        {/* REPUTATION */}
        {activeTab === "reputation" && (
          <div className="mt-12">
            <ReputationChecker />
          </div>
        )}

      </div>
    </main>
  );
}