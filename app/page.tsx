import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">

      <Navbar />

      {/* Hero Section */}

<section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
  <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[150px]" />
        <p className="mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          🛡 AI Shield India
        </p>

<h1 className="max-w-6xl text-6xl font-extrabold leading-tight tracking-tight md:text-8xl">          AI Powered{" "}

<span className="whitespace-nowrap bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 bg-clip-text text-transparent">
  Digital Safety

</span>

          <br />

          For Every Indian

        </h1>

<p className="mt-8 max-w-2xl text-lg leading-9 text-gray-300 md:text-xl">
          Detect scams, verify QR codes, analyze screenshots and
          stay protected online with AI Shield India.

        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <button className="rounded-full bg-cyan-500 px-8 py-4 text-lg font-semibold text-black transition hover:scale-105">

            Start Scanning

          </button>

          <button className="rounded-full border border-cyan-500 px-8 py-4 text-lg font-semibold text-cyan-300 transition hover:bg-cyan-500 hover:text-black">

            Explore Dashboard

          </button>

        </div>

      </section>

      <section className="px-8 pb-24">

  <h2 className="mb-12 text-center text-4xl font-bold">

    Scam Detection Tools

  </h2>

  <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">

    <FeatureCard
      icon="📝"
      title="Text Scam Detector"
      description="Analyze suspicious messages, SMS and WhatsApp texts using AI."
    />

    <FeatureCard
      icon="🔗"
      title="URL Scanner"
      description="Detect phishing websites and malicious URLs instantly."
    />

    <FeatureCard
      icon="🖼️"
      title="Image Scanner"
      description="Upload screenshots and detect scams using OCR + AI."
    />

    <FeatureCard
      icon="🎤"
      title="Voice Scam Detector"
      description="Analyze scam calls and suspicious voice recordings."
    />

    <FeatureCard
      icon="📱"
      title="QR Scanner"
      description="Check whether a QR code is safe or fraudulent."
    />

  </div>

</section>

    </main>
  );
}