"use client";

import { Threat } from "./types";

type Props = {
  state: Threat | null;
  onClose: () => void;
};

export default function StateDetailsPanel({
  state,
  onClose,
}: Props) {
  return (
<aside className="rounded-3xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl p-6 min-h-[700px] xl:min-h-[760px] transition-all duration-500 animate-in fade-in slide-in-from-right-5">
      {!state ? (
        <div className="flex h-full items-center justify-center text-center">

          <div>

            <div className="text-6xl mb-5">🛰️</div>

            <h2 className="text-2xl font-bold text-cyan-300">
              Investigation Panel
            </h2>

            <p className="mt-4 text-gray-400 leading-7">
              Click any highlighted state on the map
              to inspect cyber threat intelligence.
            </p>

          </div>

        </div>
      ) : (
        <>

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-bold text-cyan-300">
              {state.state}
            </h2>

            <button
              onClick={onClose}
      className="rounded-xl bg-red-500/90 px-3 py-2 text-white transition-all duration-300 hover:scale-110 hover:bg-red-600 active:scale-95"            >
              ✕
            </button>

          </div>

          <div className="mt-8 space-y-5">

            <div className="mb-8">

  <div className="flex justify-between text-sm mb-2">

    <span className="text-gray-400">
      Threat Score
    </span>

    <span className="font-bold text-red-400">
      {state.threat_score}/100
    </span>

  </div>

  <div className="h-4 w-full overflow-hidden rounded-full bg-slate-700">

    <div
      className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 transition-all duration-700"
      style={{
        width: `${state.threat_score}%`,
      }}
    />

  </div>

</div>
            <div className="flex items-center justify-between">

  <span className="text-gray-400">
    Threat Level
  </span>

  <span
    className={`rounded-full px-4 py-1 text-sm font-bold border
      ${
        state.threat_level === "CRITICAL"
          ? "bg-red-500/20 text-red-400 border-red-500/40"
          : state.threat_level === "HIGH"
          ? "bg-orange-500/20 text-orange-300 border-orange-500/40"
          : state.threat_level === "MEDIUM"
          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/40"
          : "bg-green-500/20 text-green-300 border-green-500/40"
      }`}
  >
    {state.threat_level}
  </span>

</div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Incidents
              </span>

              <span>
                {state.incidents}
              </span>
            </div>

            <hr className="border-white/10" />

            <div>

              <h3 className="mb-3 text-cyan-300 font-semibold">
                Latest Alert
              </h3>

              <p className="leading-7 text-gray-300">
                {state.latest_alert ??
                  "No recent alert available."}
              </p>

            </div>

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">

  <h3 className="mb-3 font-semibold text-cyan-300">
    🤖 AI Recommendation
  </h3>

  <ul className="space-y-2 text-sm text-gray-300">

    <li>✅ Verify all unknown payment requests.</li>

    <li>✅ Never share OTP or banking credentials.</li>

    <li>✅ Report suspicious numbers to Cyber Crime Portal.</li>

    <li>✅ Enable transaction alerts and MFA.</li>

  </ul>

</div>

            <div className="pt-4 text-xs text-gray-500">

              Updated{" "}
              {state.updated_at
                ? new Date(
                    state.updated_at
                  ).toLocaleString()
                : "Unknown"}

            </div>

          </div>

        </>
      )}

    </aside>
  );
}