type Props = {
  icon: string;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: Props) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-8
      backdrop-blur-xl
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-cyan-400
      hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]
      "
    >

      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">

        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl" />

      </div>

      <div className="relative z-10">

        <div className="mb-5 text-5xl">

          {icon}

        </div>

        <h3 className="mb-4 text-3xl font-bold text-white">

          {title}

        </h3>

        <p className="text-gray-400 leading-8">

          {description}

        </p>

      </div>

    </div>
  );
}