import { supabase } from "@/lib/supabase";
import ScamAnalyticsChart from "@/components/ScamAnalyticsChart";
import ScamPieChart from "@/components/ScamPieChart";
import ScanTypeChart from "@/components/ScanTypeChart";
import IndiaHeatMap from "@/components/IndiaHeatMap";
import ThreatStats from "@/components/ThreatStats";
import LiveCyberNewsCarousel from "@/components/LiveCyberNewsCarousel";
import ThreatTimeline from "@/components/ThreatTimeline";
import TopRiskStatesHorizontal from "@/components/TopRiskStatesHorizontal";
import CyberParticles from "@/components/CyberParticles";

const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export default async function DashboardPage() {
  const { data } = await supabase
    .from("scan_history")
    .select("*")
    .order("id", { ascending: false });

  const scans = data || [];

  const totalScans = scans.length;

  const safeScans = scans.filter(
    (s) => s.verdict === "SAFE"
  ).length;

  const suspiciousScans = scans.filter(
    (s) => s.verdict === "SUSPICIOUS"
  ).length;

  const scamScans = scans.filter(
    (s) => s.verdict === "SCAM"
  ).length;

  const recentScans = scans.slice(0, 3);

  const analyticsData = weekDays.map((day) => ({
  day,
  scans: scans.filter((scan) => {
    if (!scan.created_at) return false;

    return (
      weekDays[
        new Date(scan.created_at).getDay()
      ] === day
    );
  }).length,
}));

const scanTypeData = [
  {
    type: "TEXT",
    count: scans.filter(
      (s) => s.scan_type === "TEXT"
    ).length,
  },
  {
    type: "IMAGE",
    count: scans.filter(
      (s) => s.scan_type === "IMAGE"
    ).length,
  },
  {
    type: "VOICE",
    count: scans.filter(
      (s) => s.scan_type === "VOICE"
    ).length,
  },
  {
    type: "URL",
    count: scans.filter(
      (s) => s.scan_type === "URL"
    ).length,
  },
  {
    type: "QR",
    count: scans.filter(
      (s) => s.scan_type === "QR"
    ).length,
  },
  {
    type: "REPUTATION",
    count: scans.filter(
      (s) => s.scan_type === "REPUTATION"
    ).length,
  },
];

  return (
<main className="relative min-h-screen overflow-hidden bg-[#050816] px-6 py-12 pt-28 text-white">
  <div className="absolute inset-0 -z-10">

    <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />

    <div className="absolute right-0 top-[400px] h-[450px] w-[450px] rounded-full bg-purple-500/10 blur-[160px]" />

    <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[170px]" />

  </div>
  <CyberParticles />
        <div className="mx-auto max-w-7xl">
        {/* AI THREAT SUMMARY */}

<div className="mb-12 overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-purple-500/10 p-8">

  <div className="flex flex-col justify-between gap-8 lg:flex-row">

    <div className="max-w-3xl">

      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
        🤖 AI Threat Summary
      </span>

      <h1 className="mt-6 text-5xl font-extrabold">
        National Cyber Situation
      </h1>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
        AI Shield continuously monitors cyber incidents across India
        and generates real-time threat intelligence using scam reports,
        phishing trends and AI analysis.
      </p>

    </div>

    <div className="grid gap-4">

      <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

        <p className="text-sm text-gray-400">
          Current Threat
        </p>

        <h2 className="mt-2 text-3xl font-bold text-cyan-400">
          MEDIUM
        </h2>

      </div>

      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">

        <p className="text-sm text-gray-400">
          AI Recommendation
        </p>

        <p className="mt-2 text-sm leading-7 text-yellow-300">
          Monitor QR payments, suspicious URLs and fake banking
          messages over the next 24 hours.
        </p>

      </div>

    </div>

  </div>

</div>


<div className="mb-12">
  <ThreatStats />
</div>

{/* LIVE CYBER NEWS */}

<div className="mb-12">
  <LiveCyberNewsCarousel />
</div>

{/* INDIA MAP */}

<div className="mb-12">
  <IndiaHeatMap />
</div>

{/* TOP RISK STATES */}

<div className="mb-12">
  <TopRiskStatesHorizontal />
</div>

        {/* Stats */}

        <div className="mb-12 grid gap-6 md:grid-cols-4">

          <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-8">
            <h2 className="text-xl font-bold">
              Total Scans
            </h2>

            <p className="mt-4 text-5xl font-bold text-cyan-400">
              {totalScans}
            </p>
          </div>

          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8">
            <h2 className="text-xl font-bold">
              Safe
            </h2>

            <p className="mt-4 text-5xl font-bold text-green-400">
              {safeScans}
            </p>
          </div>

          <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/10 p-8">
            <h2 className="text-xl font-bold">
              Suspicious
            </h2>

            <p className="mt-4 text-5xl font-bold text-yellow-400">
              {suspiciousScans}
            </p>
          </div>

          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
            <h2 className="text-xl font-bold">
              Scam
            </h2>

            <p className="mt-4 text-5xl font-bold text-red-400">
              {scamScans}
            </p>
          </div>

        </div>

        {/* Analytics Chart */}

        <div className="mb-12 rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="mb-4 text-4xl font-bold">
            📈 Scam Analytics
          </h2>

          <p className="mb-8 text-gray-400">
            Weekly scam activity trends.
          </p>

          <ScamAnalyticsChart
  data={analyticsData}
/>

<div className="grid gap-8 lg:grid-cols-2 mt-12">

  <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

    <h2 className="mb-4 text-3xl font-bold">
      🥧 Risk Distribution
    </h2>

    <p className="mb-6 text-gray-400">
      Distribution of SAFE, SUSPICIOUS and SCAM scans.
    </p>

    <ScamPieChart
      safe={safeScans}
      suspicious={suspiciousScans}
      scam={scamScans}
    />

  </div>

  <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

    <h2 className="mb-4 text-3xl font-bold">
      📊 Scan Type Analytics
    </h2>

    <p className="mb-6 text-gray-400">
      Number of scans performed by each scanner.
    </p>

    <ScanTypeChart
      data={scanTypeData}
    />

  </div>

</div>

        </div>

        {/* AI Threat Timeline */}

<div className="mb-12">
  <ThreatTimeline />
</div>

        {/* Recent Activity */}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

          <h2 className="mb-8 text-4xl font-bold">
            Recent Activity
          </h2>

          {recentScans.length === 0 ? (
            <p className="text-gray-400">
              No scans available.
            </p>
          ) : (
            <div className="grid gap-6">

              {recentScans.map((scan) => (
                <div
                  key={scan.id}
                  className="rounded-2xl border border-white/10 bg-[#0b1225] p-6"
                >
                  <h3 className="text-2xl font-bold">
                    {scan.scan_type}
                  </h3>

                  <p className="mt-3 text-gray-300">
                    {scan.content}
                  </p>

                  <p className="mt-3 font-bold">
                    Verdict: {scan.verdict}
                  </p>

                  <p className="text-gray-400">
                    Risk Score: {scan.risk_score}%
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {scan.created_at
                      ? new Date(
                          scan.created_at
                        ).toLocaleString()
                      : "No Date"}
                  </p>
                </div>
              ))}

            </div>
          )}
          <div className="mt-8 flex justify-center">

  <a
    href="/history"
    className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-8 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
  >
    View All Activity →
  </a>

</div>

        </div>

      </div>
    </main>
  );
}
