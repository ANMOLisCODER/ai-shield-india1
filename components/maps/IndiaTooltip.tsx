"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TooltipState } from "./types";

type Props = {
  tooltip: TooltipState;
};

export default function IndiaTooltip({ tooltip }: Props) {
  return (
    <AnimatePresence>
      {tooltip.visible && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
            y: 10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            y: 10,
          }}
          transition={{
            duration: 0.18,
          }}
          className="fixed z-50 w-80 rounded-2xl border border-cyan-400/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl p-5 text-white pointer-events-none"
          style={{
            left: tooltip.x + 18,
            top: tooltip.y + 18,
          }}
        >
          <h2 className="text-xl font-bold text-cyan-300">
            {tooltip.state}
          </h2>

          <div className="mt-4 grid gap-3 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-400">
                Threat Score
              </span>

              <span className="font-bold text-red-400">
                {tooltip.score}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Threat Level
              </span>

              <span className="font-semibold text-yellow-300">
                {tooltip.level}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">
                Incidents
              </span>

              <span className="font-semibold">
                {tooltip.incidents}
              </span>
            </div>

          </div>

          <div className="mt-5 border-t border-white/10 pt-4">

            <p className="text-xs uppercase tracking-widest text-cyan-300">
              Latest Alert
            </p>

            <p className="mt-2 text-sm text-gray-200 leading-6">
              {tooltip.latestAlert}
            </p>

          </div>

          <div className="mt-4 text-xs text-gray-500">
            Updated: {tooltip.updatedAt}
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}