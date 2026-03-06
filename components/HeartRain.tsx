"use client";

import { motion } from "framer-motion";

const hearts = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 8 + Math.random() * 8,
  size: 12 + Math.random() * 16,
  opacity: 0.2 + Math.random() * 0.25,
}));

export default function HeartRain() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-rose-300/40"
          style={{
            left: `${h.left}%`,
            top: -h.size,
            fontSize: h.size,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, (Math.random() - 0.5) * 80],
            rotate: [0, Math.random() * 360],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}
