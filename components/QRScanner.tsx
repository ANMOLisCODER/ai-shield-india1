"use client";

import { useState } from "react";
import jsQR from "jsqr";
import ScamResultCard from "./ScamResultCard";

export default function QRScanner() {
  const [image, setImage] = useState<string | null>(null);
  const [decodedText, setDecodedText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64 = reader.result as string;

      setImage(base64);
      setAnalysis(null);
      setDecodedText("");

      try {
        setLoading(true);

        // Create image
        const img = new Image();

        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;

          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          const qrCode = jsQR(
            imageData.data,
            imageData.width,
            imageData.height
          );

          if (!qrCode) {
            alert("QR Code not detected");
            setLoading(false);
            return;
          }

          const decoded = qrCode.data;

          setDecodedText(decoded);

          const response = await fetch("/api/analyze-qr", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              qrContent: decoded,
            }),
          });

          const data = await response.json();

          if (data.result) {
            setAnalysis(data.result);
          }

          setLoading(false);
        };

        img.src = base64;

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

      <h2 className="mb-4 text-3xl font-bold">
        📱 QR Scam Detector
      </h2>

      <p className="mb-8 text-gray-400">
        Upload QR screenshot and decode it instantly.
      </p>

      <div className="rounded-3xl border-2 border-dashed border-cyan-500/40 bg-[#0b1225] p-12 text-center">

        <div className="mb-4 text-7xl">
          📷
        </div>

        <h3 className="mb-3 text-2xl font-bold">
          Upload QR Screenshot
        </h3>

        <p className="mb-6 text-gray-400">
          PNG, JPG, JPEG supported
        </p>

        <label className="inline-block cursor-pointer rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold text-black">

          Upload QR Image

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />

        </label>

        {loading && (
          <p className="mt-6 text-cyan-400 font-bold">
            🔍 Decoding QR...
          </p>
        )}

      </div>

      {image && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0b1225] p-6">

          <h3 className="mb-4 text-xl font-bold">
            Uploaded QR
          </h3>

          <img
            src={image}
            alt="QR"
            className="w-full rounded-2xl border border-cyan-500/20"
          />

        </div>
      )}

      {decodedText && (
        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-[#0b1225] p-6">

          <h3 className="mb-3 text-xl font-bold text-cyan-400">
            Decoded QR Content
          </h3>

          <p className="break-all text-white">
            {decodedText}
          </p>

        </div>
      )}

      {analysis && (
        <ScamResultCard analysis={analysis} />
      )}

    </div>
  );
}