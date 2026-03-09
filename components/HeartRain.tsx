"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";

function createHearts(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 8,
    size: 12 + Math.random() * 16,
    opacity: 0.2 + Math.random() * 0.25,
  }));
}

export default function HeartRain() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const hearts = useMemo(
    () => createHearts(isMobile ? 15 : 30),
    [isMobile]
  );

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
