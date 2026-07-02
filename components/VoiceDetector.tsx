"use client";

import { useState } from "react";
import ScamResultCard from "./ScamResultCard";

export default function VoiceDetector() {
  const [audioName, setAudioName] = useState("");
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] =
    useState<MediaRecorder | null>(null);

  const uploadAudio = async (file: File) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("audio", file);

      const response = await fetch(
        "/api/analyze-voice",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(data);

      if (data.error) {
        alert(data.error);
        return;
      }

      setTranscript(data.transcript || "");
      setAnalysis(data.result || null);

    } catch (error) {
      console.error(error);
      alert("Voice Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAudioName(file.name);

    await uploadAudio(file);
  };

  const startRecording = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      const recorder = new MediaRecorder(stream);

      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, {
          type: "audio/webm",
        });

        const file = new File(
          [audioBlob],
          "recording.webm",
          {
            type: "audio/webm",
          }
        );

        setAudioName("recording.webm");

        await uploadAudio(file);

        stream
          .getTracks()
          .forEach((track) => track.stop());
      };

      recorder.start();

      setMediaRecorder(recorder);
      setRecording(true);

    } catch (error) {
      console.error(error);
      alert("Microphone permission denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

      <h2 className="mb-4 text-3xl font-bold">
        🎤 Voice Scam Detector
      </h2>

      <p className="mb-8 text-gray-400">
        Upload suspicious call recordings or
        record your own voice.
      </p>

      <div className="rounded-3xl border-2 border-dashed border-cyan-500/40 bg-[#0b1225] p-12 text-center">

        <div className="mb-4 text-7xl">
          🎙️
        </div>

        <h3 className="mb-3 text-2xl font-bold">
          Voice Scanner
        </h3>

        <p className="mb-6 text-gray-400">
          MP3, WAV, M4A, WEBM
        </p>

        <div className="flex flex-wrap justify-center gap-4">

          <label className="cursor-pointer rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold text-black hover:scale-105">

            Upload Voice

            <input
              type="file"
              accept=".mp3,.wav,.m4a,.webm"
              onChange={handleUpload}
              className="hidden"
            />

          </label>

          {!recording ? (
            <button
              onClick={startRecording}
              className="rounded-full bg-red-500 px-8 py-4 text-lg font-bold text-white hover:scale-105"
            >
              🎙 Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="rounded-full bg-yellow-500 px-8 py-4 text-lg font-bold text-black hover:scale-105"
            >
              ⏹ Stop Recording
            </button>
          )}

        </div>

        {audioName && (
          <p className="mt-4 text-cyan-400">
            {audioName}
          </p>
        )}

        {loading && (
          <p className="mt-4 font-bold text-cyan-400">
            🔍 Deepgram + Groq analyzing...
          </p>
        )}

      </div>

      {transcript && (
        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0b1225] p-6">

          <h3 className="mb-3 text-xl font-bold text-cyan-400">
            Transcript
          </h3>

          <p className="whitespace-pre-wrap text-gray-300">
            {transcript}
          </p>

        </div>
      )}

      {analysis && (
        <ScamResultCard
          analysis={analysis}
        />
      )}

    </div>
  );
}