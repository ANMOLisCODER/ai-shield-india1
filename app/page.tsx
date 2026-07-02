import FeatureCard from "../components/FeatureCard";
import Link from "next/link";
import {
  Shield,
  Brain,
  Activity,
  Lock,
  ScanSearch,
  Globe,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-[180px]" />

        <div className="absolute right-[-200px] top-[250px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[180px]" />

        <div className="absolute bottom-[-220px] left-1/3 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[200px]" />

      </div>

      {/* HERO */}

      <section className="relative flex min-h-screen items-center justify-center px-6 pt-28">

        <div className="mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-xl">

              🛡 AI Shield India

            </span>

            <h1 className="mt-8 text-6xl font-extrabold leading-tight md:text-7xl">

              AI Powered

              <span className="block bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent">

                Digital Safety

              </span>

              For Every Indian

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-gray-300">

              Detect phishing, fake QR codes, malicious websites,
              suspicious screenshots, scam calls and fraudulent
              messages using powerful AI built for Indian cyber threats.

            </p>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row">

              <Link
                href="/scam-tools"
                className="rounded-full bg-cyan-500 px-9 py-4 text-lg font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_35px_rgba(6,182,212,.45)]"
              >
                🚀 Start Scanning
              </Link>

              <Link
                href="/dashboard"
                className="rounded-full border border-cyan-500/40 bg-white/5 px-9 py-4 text-lg font-bold text-cyan-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-500 hover:text-black"
              >
                📊 Explore Dashboard
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="absolute inset-0 rounded-[40px] bg-cyan-500/10 blur-3xl" />

            <div className="relative rounded-[40px] border border-cyan-500/20 bg-white/5 p-10 backdrop-blur-2xl">

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-6">

                  <Shield className="mb-5 h-10 w-10 text-cyan-400" />

                  <h3 className="text-4xl font-extrabold text-cyan-400">

                    36+

                  </h3>

                  <p className="mt-2 text-gray-400">

                    States Protected

                  </p>

                </div>

                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">

                  <Activity className="mb-5 h-10 w-10 text-red-400" />

                  <h3 className="text-4xl font-extrabold text-red-400">

                    950+

                  </h3>

                  <p className="mt-2 text-gray-400">

                    Threat Reports

                  </p>

                </div>

                <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-6">

                  <Brain className="mb-5 h-10 w-10 text-yellow-400" />

                  <h3 className="text-4xl font-extrabold text-yellow-400">

                    AI

                  </h3>

                  <p className="mt-2 text-gray-400">

                    Powered Detection

                  </p>

                </div>

                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6">

                  <Lock className="mb-5 h-10 w-10 text-emerald-400" />

                  <h3 className="text-4xl font-extrabold text-emerald-400">

                    24×7

                  </h3>

                  <p className="mt-2 text-gray-400">

                    Live Monitoring

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* WHY AI SHIELD */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-5xl font-bold">

            Why AI Shield India?

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-400">

            Built specifically for Indian cyber threats using
            AI-powered intelligence, privacy-first architecture
            and real-time monitoring.

          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-2">

            <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">

                <Brain className="h-8 w-8 text-cyan-400" />

              </div>

              <h3 className="text-3xl font-bold">

                AI Powered Detection

              </h3>

              <p className="mt-5 leading-8 text-gray-400">

                Advanced AI analyzes scam messages,
                screenshots, voice recordings,
                phishing websites and QR codes
                within seconds.

              </p>

            </div>

            <div className="rounded-3xl border border-emerald-500/20 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/40">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">

                <Activity className="h-8 w-8 text-emerald-400" />

              </div>

              <h3 className="text-3xl font-bold">

                Real-Time Monitoring

              </h3>

              <p className="mt-5 leading-8 text-gray-400">

                Live cyber intelligence continuously
                tracks emerging threats and warns
                users before they become victims.

              </p>

            </div>

            <div className="rounded-3xl border border-yellow-500/20 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/40">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10">

                <Lock className="h-8 w-8 text-yellow-400" />

              </div>

              <h3 className="text-3xl font-bold">

                Privacy First

              </h3>

              <p className="mt-5 leading-8 text-gray-400">

                Your scans remain secure and
                confidential while AI performs
                analysis without compromising
                your personal information.

              </p>

            </div>

            <div className="rounded-3xl border border-purple-500/20 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-purple-400/40">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10">

                <BadgeCheck className="h-8 w-8 text-purple-400" />

              </div>

              <h3 className="text-3xl font-bold">

                Built For India

              </h3>

              <p className="mt-5 leading-8 text-gray-400">

                Designed specifically for
                UPI fraud, OTP scams,
                fake KYC requests,
                QR fraud and banking attacks.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-5xl font-bold">

            🚀 How AI Shield Works

          </h2>

          <p className="mt-5 text-center text-lg text-gray-400">

            Protect yourself in four simple steps.

          </p>

          <div className="mt-20 grid gap-8 lg:grid-cols-4">

            <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center backdrop-blur-xl transition hover:-translate-y-2">

              <div className="mb-6 text-6xl">

                📥

              </div>

              <h3 className="text-2xl font-bold">

                Upload

              </h3>

              <p className="mt-4 leading-7 text-gray-400">

                Upload text,
                screenshots,
                QR codes,
                URLs or voice recordings.

              </p>

            </div>

            <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center backdrop-blur-xl transition hover:-translate-y-2">

              <div className="mb-6 text-6xl">

                🧠

              </div>

              <h3 className="text-2xl font-bold">

                AI Analysis

              </h3>

              <p className="mt-4 leading-7 text-gray-400">

                AI engines inspect scam
                patterns using multiple
                security checks.

              </p>

            </div>

            <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center backdrop-blur-xl transition hover:-translate-y-2">

              <div className="mb-6 text-6xl">

                📊

              </div>

              <h3 className="text-2xl font-bold">

                Risk Score

              </h3>

              <p className="mt-4 leading-7 text-gray-400">

                Receive detailed risk score,
                verdict and AI explanation.

              </p>

            </div>

            <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 text-center backdrop-blur-xl transition hover:-translate-y-2">

              <div className="mb-6 text-6xl">

                🛡️

              </div>

              <h3 className="text-2xl font-bold">

                Stay Safe

              </h3>

              <p className="mt-4 leading-7 text-gray-400">

                Follow recommendations
                and avoid cyber fraud
                before it's too late.

              </p>

            </div>

          </div>

        </div>

      </section>
            {/* SCAM TOOLS */}

      <section className="px-8 py-24">

        <div className="mx-auto max-w-7xl">

          <h2 className="mb-5 text-center text-5xl font-bold">

            Scam Detection Tools

          </h2>

          <p className="mx-auto mb-16 max-w-3xl text-center text-lg leading-8 text-gray-400">

            Everything you need to detect phishing attacks,
            fake websites, scam messages, fraudulent QR codes
            and suspicious media using AI.

          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            <FeatureCard
              icon="📝"
              title="Text Scam Detector"
              description="Analyze suspicious SMS, emails and WhatsApp messages using AI."
            />

            <FeatureCard
              icon="🔗"
              title="URL Scanner"
              description="Detect phishing websites and malicious URLs instantly."
            />

            <FeatureCard
              icon="🖼️"
              title="Image Scanner"
              description="Upload screenshots and detect fake offers using OCR + AI."
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

            <FeatureCard
              icon="🌐"
              title="Domain Reputation"
              description="Verify website reputation before visiting unknown domains."
            />

          </div>

        </div>

      </section>

      {/* WHY CHOOSE */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-5xl font-bold">

            Why Choose AI Shield?

          </h2>

          <p className="mt-5 text-center text-lg text-gray-400">

            Traditional security tools cannot keep up with
            modern AI-powered cyber attacks.

          </p>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">

            <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10 backdrop-blur-xl">

              <h3 className="mb-8 text-3xl font-bold text-red-400">

                ❌ Without AI Shield

              </h3>

              <ul className="space-y-5 text-lg text-gray-300">

                <li>• Manual scam detection</li>

                <li>• Easy to miss phishing attacks</li>

                <li>• No AI explanation</li>

                <li>• No live cyber intelligence</li>

                <li>• Slow verification process</li>

                <li>• Higher fraud risk</li>

              </ul>

            </div>

            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-10 backdrop-blur-xl">

              <h3 className="mb-8 text-3xl font-bold text-emerald-400">

                ✅ With AI Shield

              </h3>

              <ul className="space-y-5 text-lg text-gray-300">

                <li>• AI powered detection</li>

                <li>• Real-time scam analysis</li>

                <li>• Instant risk score</li>

                <li>• Smart AI recommendations</li>

                <li>• Built for Indian cyber threats</li>

                <li>• Fast & privacy focused</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-5xl font-bold">

            Powerful AI Features

          </h2>

          <p className="mt-5 text-center text-lg text-gray-400">

            Modern protection designed for today's cyber world.

          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">

              <ScanSearch className="mx-auto mb-5 h-12 w-12 text-cyan-400" />

              <h3 className="text-2xl font-bold">

                Smart Scan

              </h3>

              <p className="mt-4 leading-7 text-gray-400">

                AI automatically identifies suspicious content.

              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">

              <Globe className="mx-auto mb-5 h-12 w-12 text-blue-400" />

              <h3 className="text-2xl font-bold">

                Global Threats

              </h3>

              <p className="mt-4 leading-7 text-gray-400">

                Stay updated with worldwide cyber intelligence.

              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">

              <BadgeCheck className="mx-auto mb-5 h-12 w-12 text-emerald-400" />

              <h3 className="text-2xl font-bold">

                Trusted Results

              </h3>

              <p className="mt-4 leading-7 text-gray-400">

                Reliable AI backed by multiple verification layers.

              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">

              <Sparkles className="mx-auto mb-5 h-12 w-12 text-yellow-400" />

              <h3 className="text-2xl font-bold">

                AI Insights

              </h3>

              <p className="mt-4 leading-7 text-gray-400">

                Easy-to-understand explanations and recommendations.

              </p>

            </div>

          </div>

        </div>

      </section>
            {/* TESTIMONIALS */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-center text-5xl font-bold">

            Trusted by Users

          </h2>

          <p className="mt-5 text-center text-lg text-gray-400">

            Helping people stay protected from modern cyber fraud.

          </p>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/30">

              <div className="mb-5 text-5xl">

                👨‍🎓

              </div>

              <h3 className="text-2xl font-bold">

                College Student

              </h3>

              <p className="mt-5 leading-8 text-gray-400">

                AI Shield detected a fake internship offer before
                I shared my Aadhaar and banking details.

              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/30">

              <div className="mb-5 text-5xl">

                👨‍💼

              </div>

              <h3 className="text-2xl font-bold">

                Business Owner

              </h3>

              <p className="mt-5 leading-8 text-gray-400">

                The phishing URL scanner prevented my employees
                from opening a dangerous invoice link.

              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/30">

              <div className="mb-5 text-5xl">

                👵

              </div>

              <h3 className="text-2xl font-bold">

                Senior Citizen

              </h3>

              <p className="mt-5 leading-8 text-gray-400">

                AI Shield explained an OTP scam in simple language
                and helped me avoid losing money.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-blue-500/10 p-14 text-center backdrop-blur-2xl">

          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300">

            🚀 Start Protecting Yourself Today

          </span>

          <h2 className="mt-8 text-5xl font-extrabold md:text-6xl">

            Your Digital Safety Starts Here

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-300">

            Join thousands of users using AI Shield India
            to detect phishing attacks, fake QR codes,
            malicious websites and scam messages before
            becoming victims.

          </p>

          <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

            <Link
              href="/scam-tools"
              className="rounded-full bg-cyan-500 px-10 py-5 text-lg font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_35px_rgba(6,182,212,.45)]"
            >
              🛡 Start Scanning
            </Link>

            <Link
              href="/dashboard"
              className="rounded-full border border-cyan-500/30 bg-white/5 px-10 py-5 text-lg font-bold text-cyan-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-500 hover:text-black"
            >
              📊 Explore Dashboard
            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-black/20 px-6 py-12">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 md:flex-row">

          <div>

            <h2 className="text-3xl font-bold text-cyan-400">

              🛡 AI Shield India

            </h2>

            <p className="mt-4 max-w-md leading-8 text-gray-400">

              AI Powered Cyber Safety Platform built for
              Samsung Solve for Tomorrow.

            </p>

          </div>

          <div className="grid gap-3 text-center md:text-right">

            <Link
              href="/"
              className="transition hover:text-cyan-400"
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              className="transition hover:text-cyan-400"
            >
              Dashboard
            </Link>

            <Link
              href="/history"
              className="transition hover:text-cyan-400"
            >
              History
            </Link>

            <Link
              href="/emergency"
              className="transition hover:text-cyan-400"
            >
              Emergency
            </Link>

          </div>

        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-8 text-center text-gray-500">

          © 2026 AI Shield India • Built with ❤️ in India •
          Samsung Solve for Tomorrow

        </div>

      </footer>

    </main>
  );
}

