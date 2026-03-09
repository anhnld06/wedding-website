"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";
import Timeline from "@/components/Timeline";

export default function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="story"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center snap-start overflow-hidden py-16 sm:py-24"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-rose-50/30 to-cream-100" />

      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-200/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold-200/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Heart className="w-8 h-8 text-rose-400 fill-rose-300 mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold-500 tracking-[0.3em] uppercase text-xs mb-6 font-medium"
        >
          Our Love Story
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-rose-800 mb-8 leading-snug"
        >
          Two hearts, one beautiful journey
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-20 bg-gold-400/40" />
          <div className="w-2 h-2 bg-gold-400 rounded-full" />
          <div className="h-px w-20 bg-gold-400/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-rose-700/60 text-base sm:text-lg leading-relaxed mb-6"
        >
          From the moment our eyes met, we knew something magical was about to
          unfold. Through the laughter, the adventures, the quiet moments — we
          found in each other a love that feels like home.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-rose-700/50 text-sm sm:text-base leading-relaxed italic font-serif"
        >
          &ldquo;In all the world, there is no heart for me like yours.
          In all the world, there is no love for you like mine.&rdquo;
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-gold-500/60 text-xs mt-4 tracking-wider uppercase"
        >
          — Maya Angelou
        </motion.p>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 w-full max-w-3xl mx-auto"
        >
          <Timeline />
        </motion.div>
      </div>
    </section>
  );
}
