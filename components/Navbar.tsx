"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Scam Tools", path: "/scam-tools" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "History", path: "/history" },
    { name: "Emergency", path: "/emergency" },
  ];

  return (
    <nav className="fixed left-1/2 top-5 z-50 w-[90%] max-w-7xl -translate-x-1/2">

      <div className="relative flex items-center justify-between overflow-hidden rounded-full border border-cyan-500/20 bg-slate-900/75 px-8 py-4 backdrop-blur-2xl shadow-[0_0_30px_rgba(6,182,212,.08)] transition-all duration-300">

        {/* Glow */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />

        {/* Logo */}

        <Link href="/">

          <h1 className="relative z-10 cursor-pointer text-xl font-bold text-cyan-400 transition-all duration-300 hover:scale-105 hover:text-cyan-300">

            🛡 AI Shield India

          </h1>

        </Link>

        {/* Navigation */}

        <ul className="relative z-10 hidden items-center gap-2 md:flex">

          {navItems.map((item) => {

            const active = pathname === item.path;

            return (

              <li key={item.path}>

                <Link
                  href={item.path}
                  className={`
                    relative block overflow-hidden rounded-full
                    px-5 py-2.5 text-sm font-medium
                    transition-all duration-300

                    ${
                      active
                        ? "bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,.25)]"
                        : "text-gray-300 hover:bg-white/5 hover:text-cyan-300 hover:scale-105"
                    }
                  `}
                >

                  {/* Active Glow */}

                  {active && (
                    <>
                      <span className="absolute inset-0 rounded-full border border-cyan-400/30" />

                      <span className="absolute bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4]" />
                    </>
                  )}

                  <span className="relative z-10">
                    {item.name}
                  </span>

                </Link>

              </li>

            );

          })}

        </ul>

      </div>

    </nav>
  );
}