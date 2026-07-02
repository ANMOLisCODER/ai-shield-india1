"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function CyberParticles() {

  const particles = useMemo(() => {

    return Array.from({ length: 25 }, (_, i) => ({

      id: i,

      size: Math.random() * 8 + 3,

      left: Math.random() * 100,

      top: Math.random() * 100,

      duration: Math.random() * 8 + 8,

      delay: Math.random() * 10,

    }));

  }, []);

  return (

    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {particles.map((particle) => (

        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-400/30 blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [-20, -250],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />

      ))}

    </div>

  );

}