"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Chỉ render khi đã mở phong bì (điều kiện ở page.tsx)

function SparkleParticle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 bg-gold-400 rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.5, 1, 0],
        y: [0, -20, -40],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    />
  );
}

const sparkles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  delay: Math.random() * 3,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
}));

export default function RevealSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const show = isInView;

  return (
    <section
      id="reveal"
      ref={ref}
      className="relative h-screen flex items-center justify-center snap-start overflow-hidden"
    >
      {/* Luxurious dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950 via-rose-900 to-rose-950" />

      {/* Gold shimmer overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #d4a843 0%, transparent 50%), radial-gradient(circle at 70% 60%, #d4a843 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Sparkle particles */}
      {show &&
        sparkles.map((s) => (
          <SparkleParticle key={s.id} delay={s.delay} x={s.x} y={s.y} />
        ))}

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-gold-400 tracking-[0.3em] uppercase text-xs mb-8 font-medium"
        >
          Our Blessing
        </motion.p>

        {/* Decorative frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={show ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="relative inline-block"
        >
          {/* Corner accents */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-gold-400/50" />
          <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-gold-400/50" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-gold-400/50" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-gold-400/50" />

          <div className="px-10 py-8 sm:px-16 sm:py-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={show ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-rose-200/60 text-sm mb-3 font-serif italic"
            >
              Wishing you
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={show ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.9,
                type: "spring",
                stiffness: 100,
              }}
            >
              <p className="text-5xl sm:text-6xl md:text-7xl font-serif text-gold-400 mb-2">
                Happiness
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={show ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-rose-200/60 text-sm font-serif italic"
            >
              forever & always
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold-400/30" />
            <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
            <div className="h-px w-12 bg-gold-400/30" />
          </div>
          <p className="text-rose-200/40 text-sm leading-relaxed max-w-md mx-auto">
            Chúc cho hành trình của chúng mình luôn tràn ngập yêu thương, tiếng cười
            và những điều may mắn. Cảm ơn vì đã đồng hành và chứng kiến khoảnh khắc
            ý nghĩa này cùng tụi mình.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
