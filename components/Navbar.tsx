export default function Navbar() {
  return (
    <nav className="fixed top-5 left-1/2 z-50 w-[90%] max-w-7xl -translate-x-1/2">

      <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-xl">

        <h1 className="text-xl font-bold text-cyan-400">

          🛡 AI Shield India

        </h1>

        <ul className="hidden gap-8 text-gray-300 md:flex">

          <li className="cursor-pointer hover:text-cyan-400">
            Home
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            Scam Tools
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            Dashboard
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            Reputation
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            History
          </li>

          <li className="cursor-pointer hover:text-cyan-400">
            Emergency
          </li>

        </ul>

      </div>

    </nav>
  );
}