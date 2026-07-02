"use client";

export default function ThreatTimeline() {
  const events = [
    {
      time: "10:32",
      icon: "📰",
      title: "Cyber news detected",
    },
    {
      time: "10:32",
      icon: "🤖",
      title: "Gemini analyzed article",
    },
    {
      time: "10:33",
      icon: "📍",
      title: "State identified",
    },
    {
      time: "10:33",
      icon: "🔥",
      title: "Threat score generated",
    },
    {
      time: "10:34",
      icon: "🗺️",
      title: "Threat map updated",
    },
  ];

  return (
    <section className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">

      <h2 className="mb-2 text-3xl font-bold">
        🤖 AI Threat Timeline
      </h2>

      <p className="mb-8 text-gray-400">
        Shows how AI processes cyber incidents.
      </p>

      <div className="space-y-6">

        {events.map((event, index) => (

          <div
            key={index}
            className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#10192d] p-4"
          >

            <div className="text-3xl">
              {event.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold">
                {event.title}
              </h3>

              <p className="text-sm text-gray-400">
                {event.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}