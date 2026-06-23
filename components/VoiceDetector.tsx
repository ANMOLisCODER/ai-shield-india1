export default function VoiceDetector() {
  return (

    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

      <h2 className="mb-4 text-3xl font-bold">

        🎤 Voice Scam Detector

      </h2>

      <p className="mb-8 text-gray-400">

        Upload or record suspicious calls and let AI analyze the conversation.

      </p>


      <div className="rounded-3xl border-2 border-dashed border-cyan-500/40 bg-[#0b1225] p-16 text-center">

        <div className="mb-4 text-7xl">

          🎙️

        </div>

        <h3 className="mb-3 text-2xl font-bold">

          Upload Audio File

        </h3>

        <p className="mb-6 text-gray-400">

          MP3, WAV and M4A supported

        </p>

        <button className="rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold text-black transition hover:scale-105">

          Upload Voice

        </button>

      </div>

    </div>

  );
}