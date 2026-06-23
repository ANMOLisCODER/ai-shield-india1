export default function URLScanner() {

  return (

    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

      <h2 className="mb-4 text-3xl font-bold">

        🔗 URL Scam Detector

      </h2>

      <p className="mb-8 text-gray-400">

        Check whether a website or link is safe before opening it.

      </p>


      <input

        type="text"

        placeholder="Paste URL here..."

        className="w-full rounded-2xl border border-white/10 bg-[#0b1225] p-5 text-lg outline-none focus:border-cyan-500"

      />


      <button className="mt-6 rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold text-black transition hover:scale-105">

        Check URL

      </button>


      <div className="mt-10 rounded-2xl border border-green-500/30 bg-green-500/10 p-6">

        <h3 className="mb-2 text-2xl font-bold text-green-400">

          ✅ Safe Website

        </h3>

        <p className="text-gray-300">

          This URL appears safe and no phishing activity detected.

        </p>

      </div>

    </div>

  );

}