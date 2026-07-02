"use client";

export default function IndiaLegend() {
  const items = [
    {
      label: "Low (0–24)",
      color: "bg-green-500",
    },
    {
      label: "Medium (25–49)",
      color: "bg-yellow-400",
    },
    {
      label: "High (50–74)",
      color: "bg-orange-500",
    },
    {
      label: "Critical (75+)",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-4 backdrop-blur-xl">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2"
        >
          <span
            className={`h-4 w-4 rounded-full animate-pulse ${item.color}`}
          />

          <span className="text-sm text-gray-300">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}