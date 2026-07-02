"use client";

import { useState } from "react";
import ScamResultCard from "./ScamResultCard";

export default function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState<any>(null);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;

      setImage(base64);

      try {
        setLoading(true);

        const response = await fetch("/api/analyze-image", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            imageBase64: base64.split(",")[1],
          }),
        });

        const data = await response.json();

        console.log(data);

        if (!data.result) {
          alert(data.error || "Analysis Failed");
          return;
        }

        const parsed = JSON.parse(data.result);

        setAnalysis(parsed);
      } catch (error) {
        console.error(error);

        alert("Image Analysis Failed");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

      <h2 className="mb-4 text-3xl font-bold">
        🖼 Image Scam Detector
      </h2>

      <p className="mb-8 text-gray-400">
        Upload screenshots of WhatsApp chats, emails,
        SMS or suspicious images.
      </p>

      <div className="rounded-3xl border-2 border-dashed border-cyan-500/40 bg-[#0b1225] p-12 text-center">

        <div className="mb-4 text-7xl">
          🖼️
        </div>

        <h3 className="mb-3 text-2xl font-bold">
          Upload Screenshot
        </h3>

        <p className="mb-6 text-gray-400">
          PNG, JPG, JPEG supported
        </p>

        <label className="inline-block cursor-pointer rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold text-black transition hover:scale-105">

          Upload Image

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

        </label>

        {loading && (
          <p className="mt-6 text-cyan-400 font-bold">
            🔍 Gemini analyzing image...
          </p>
        )}

      </div>

      {image && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0b1225] p-6">

          <h3 className="mb-4 text-xl font-bold">
            Uploaded Image
          </h3>

          <img
            src={image}
            alt="Uploaded"
            className="w-full rounded-2xl border border-cyan-500/20"
          />

        </div>
      )}

      {analysis && (
        <ScamResultCard analysis={analysis} />
      )}

    </div>
  );
}