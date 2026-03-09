"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useWeddingEventDate } from "@/hooks/use-wedding-event-date";

export default function HeroSection() {
  const { short: dateShort } = useWeddingEventDate();
  const scrollToNext = () => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden snap-start"
    >
      {/* Background with parallax feel */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Wedding invitation background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </div>
      {/* Dark red overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/10 via-rose-900/10 to-rose-950/20" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-rose-900 tracking-[0.4em] uppercase text-xs sm:text-sm mb-6 font-medium"
        >
          The Wedding of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl text-white mb-2 leading-tight"
          style={{ fontFamily: '"Aston Script", var(--font-serif), serif' }}
        >
          Anh
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center justify-center gap-4 my-3"
        >
          <div className="h-px w-16 bg-gold-400/60" />
          <span className="text-gold-300 text-2xl font-serif italic">&</span>
          <div className="h-px w-16 bg-gold-400/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 1.0 }}
          className="text-4xl sm:text-6xl md:text-7xl text-white mb-8 leading-tight"
          style={{ fontFamily: '"Aston Script", var(--font-serif), serif' }}
        >
          Châu
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-rose-900 text-sm sm:text-base tracking-wider mb-10"
          style={{ fontFamily: '"Love Letter", var(--font-serif)' }}
        >
          {dateShort} &nbsp;&bull;&nbsp; TanMy Palace, QuangTri
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 1.6 }}
          onClick={scrollToNext}
          className="group inline-flex items-center gap-2 px-8 py-3.5 border border-gold-400/50 text-gold-300 rounded-full text-sm tracking-[0.2em] uppercase hover:bg-gold-600/10 hover:border-gold-400 transition-all duration-500"
        >
          Open Invitation
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
