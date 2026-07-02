'use client';

import React from 'react';

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white antialiased selection:bg-red-500/20 selection:text-red-300">
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(239,68,68,0.5); }
          50% { box-shadow: 0 0 60px rgba(239,68,68,0.9); }
        }
        .glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* SECTION 1: Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-md md:p-20">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/30 via-transparent to-transparent opacity-40"></div>
          <div className="absolute inset-0 -z-0 animate-gradient-move bg-gradient-to-r from-red-600/10 via-purple-600/5 to-transparent"></div>
          <div className="relative z-10 text-center">
            <span className="inline-block rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-semibold text-red-300 backdrop-blur-sm">
              🚨 Emergency
            </span>
            <h1 className="mt-6 bg-gradient-to-r from-red-400 to-pink-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
              Cyber Emergency Center
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
              Immediate help during online fraud, cybercrime and financial scams.
            </p>
          </div>
        </section>

        {/* SECTION 2: Large Red Emergency Button */}
        <div className="flex justify-center py-16">
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-pulse group relative inline-flex items-center gap-3 rounded-3xl bg-gradient-to-r from-red-600 to-red-500 px-12 py-6 text-xl font-bold text-white shadow-2xl shadow-red-600/30 transition-all duration-300 hover:scale-105 hover:from-red-500 hover:to-red-400 md:text-2xl"
          >
            REPORT CYBERCRIME
            <span className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-2px]">
              ↗
            </span>
          </a>
        </div>

        {/* SECTION 3: Emergency Contact Cards */}
        <section className="py-20">
          <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
            Emergency Contacts
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '📞', title: '1930', num: 'Call 1930', desc: 'National Cyber Crime Helpline', link: 'tel:1930' },
              { icon: '🚔', title: '112', num: 'Call 112', desc: 'Police Emergency', link: 'tel:112' },
              { icon: '👩‍🦰', title: '181', num: 'Call 181', desc: 'Women Helpline', link: 'tel:181' },
              { icon: '🛡️', title: 'CERT-IN', num: 'Visit Website', desc: 'Indian Computer Emergency Response Team', link: 'https://www.cert-in.org.in', external: true },
              { icon: '💻', title: 'Cyber Crime Portal', num: 'Report Online', desc: 'National Cyber Crime Reporting Portal', link: 'https://cybercrime.gov.in', external: true },
              { icon: '🛡️', title: 'I4C', num: 'Visit I4C', desc: 'Indian Cyber Coordination Centre', link: 'https://www.i4c.gov.in', external: true },
            ].map((card) => (
              <a
                key={card.title}
                href={card.link}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                className="group rounded-3xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-red-500/30 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-red-500/10"
              >
                <span className="text-5xl">{card.icon}</span>
                <h3 className="mt-4 text-2xl font-bold text-white">{card.title}</h3>
                <p className="mt-2 text-xl font-semibold text-red-400">{card.num}</p>
                <p className="mt-1 text-sm text-gray-400">{card.desc}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500 transition-colors group-hover:text-red-400">
                  {card.external ? 'Open website' : 'Tap to call'} <span className="ml-1">→</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* SECTION 4: Quick Safety Actions */}
        <section className="py-20">
          <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
            Quick Safety Actions
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🏦', title: 'Freeze Bank Account', desc: 'Immediately lock your accounts via netbanking or call your bank.' },
              { icon: '📵', title: 'Block SIM', desc: 'Contact your telecom provider to suspend your SIM card.' },
              { icon: '💬', title: 'Report WhatsApp', desc: 'Report fraudulent chats and block the sender instantly.' },
              { icon: '💸', title: 'Block UPI', desc: 'Disable UPI services from your banking app or UPI app.' },
              { icon: '🌐', title: 'Report Fake Website', desc: 'Submit the URL to cybercrime.gov.in or I4C portal.' },
              { icon: '📱', title: 'Report Fake QR', desc: 'Never scan unknown QR codes. Report them immediately.' },
            ].map((action) => (
              <div
                key={action.title}
                className="group rounded-3xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-red-500/20 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-red-500/5"
              >
                <span className="text-5xl">{action.icon}</span>
                <h3 className="mt-4 text-xl font-bold text-white">{action.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{action.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: Emergency Steps Timeline */}
        <section className="py-20">
          <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
            Emergency Steps
          </h2>
          <div className="relative mx-auto max-w-2xl">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-red-500/50 to-transparent" />
            {[
              { step: 1, title: 'Disconnect Internet', desc: 'Turn off WiFi and mobile data immediately to stop remote access.' },
              { step: 2, title: 'Call 1930 Immediately', desc: 'Dial the national cyber helpline to report the fraud.' },
              { step: 3, title: 'Block Your Bank', desc: 'Freeze your accounts through netbanking or by calling the bank.' },
              { step: 4, title: 'Change Passwords', desc: 'Reset all important passwords from a clean device.' },
              { step: 5, title: 'Report Cybercrime', desc: 'File a detailed complaint on cybercrime.gov.in with all evidence.' },
            ].map((item) => (
              <div key={item.step} className="relative flex items-start gap-6 pb-10 last:pb-0">
                <div className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-lg font-bold text-white shadow-lg shadow-red-500/30">
                  {item.step}
                </div>
                <div className="flex-1 rounded-2xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:border-red-500/20 hover:bg-white/[0.06]">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: Important Tips */}
        <section className="py-20">
          <h2 className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
            Important Tips
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { icon: '🔐', title: 'Never Share OTP', desc: 'OTP is your personal key. Banks never ask for it.' },
              { icon: '📦', title: 'Never Install Unknown APK', desc: 'Unknown apps can steal your data and take control of your device.' },
              { icon: '📺', title: 'Never Screen Share Banking Apps', desc: 'Scammers use screen sharing to capture sensitive information.' },
              { icon: '📷', title: 'Never Trust Unknown QR', desc: 'Fake QR codes lead to phishing sites or auto-debit malware.' },
            ].map((tip) => (
              <div
                key={tip.title}
                className="flex gap-5 rounded-3xl border border-red-500/10 bg-red-500/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/[0.06]"
              >
                <span className="text-4xl">{tip.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{tip.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: Footer */}
        <footer className="pt-16 text-center">
          <p className="text-sm text-gray-500">
            AI Shield India helps you respond faster during cyber emergencies.
          </p>
        </footer>
      </div>
    </div>
  );
}