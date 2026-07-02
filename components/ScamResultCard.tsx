type Props = {
  analysis: {
    verdict: string;
    riskScore: number;
    reasons: string[];
    advice: string[];
  };
};

export default function ScamResultCard({ analysis }: Props) {
  const verdictColor =
    analysis.verdict === "SCAM"
      ? "border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.5)]"
      : analysis.verdict === "SUSPICIOUS"
      ? "border-yellow-500 bg-yellow-500/20 text-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.5)]"
      : "border-green-500 bg-green-500/20 text-green-400 shadow-[0_0_25px_rgba(34,197,94,0.5)]";

  const riskColor =
    analysis.riskScore >= 80
      ? "border-red-500 bg-red-500/20 text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.5)]"
      : analysis.riskScore >= 50
      ? "border-yellow-500 bg-yellow-500/20 text-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.5)]"
      : "border-green-500 bg-green-500/20 text-green-400 shadow-[0_0_25px_rgba(34,197,94,0.5)]";

  const progressColor =
    analysis.riskScore >= 80
      ? "bg-red-500"
      : analysis.riskScore >= 50
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1225] p-6">

      <div className="mb-6 flex flex-wrap gap-4">

        <div className={`rounded-full border px-5 py-2 font-bold ${verdictColor}`}>
          {analysis.verdict}
        </div>

        <div className={`rounded-full border px-5 py-2 font-bold ${riskColor}`}>
          Risk Score: {analysis.riskScore}%
        </div>

      </div>

      <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-white/10">

        <div
          className={`h-full rounded-full ${progressColor}`}
          style={{
            width: `${analysis.riskScore}%`,
          }}
        />

      </div>

      <div className="mb-8">

        <h3 className="mb-3 text-xl font-bold text-red-400">
          ❌ Reasons
        </h3>

        <ul className="space-y-2">

          {analysis.reasons?.map((reason, index) => (
            <li key={index}>• {reason}</li>
          ))}

        </ul>

      </div>

      <div>

        <h3 className="mb-3 text-xl font-bold text-green-400">
          ✅ Safety Advice
        </h3>

        <ul className="space-y-2">

          {analysis.advice?.map((item, index) => (
            <li key={index}>• {item}</li>
          ))}

        </ul>

      </div>

    </div>
  );
}