export default function QRScanner() {
  return (

    <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

      <h2 className="mb-4 text-3xl font-bold">

        📱 QR Scam Detector

      </h2>

      <p className="mb-8 text-gray-400">

        Scan QR codes using camera or upload QR screenshots.

      </p>


      <div className="rounded-3xl border-2 border-dashed border-cyan-500/40 bg-[#0b1225] p-16 text-center">

        <div className="mb-4 text-7xl">

          📷

        </div>

        <h3 className="mb-3 text-2xl font-bold">

          Scan QR Code

        </h3>

        <p className="mb-8 text-gray-400">

          Use Camera or Upload QR Image

        </p>


        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">

          <button className="rounded-full bg-cyan-500 px-8 py-4 text-lg font-bold text-black transition hover:scale-105">

            Open Camera

          </button>


          <button className="rounded-full border border-cyan-500 px-8 py-4 text-lg font-bold text-cyan-300 transition hover:bg-cyan-500 hover:text-black">

            Upload QR Image

          </button>

        </div>

      </div>

    </div>

  );
}