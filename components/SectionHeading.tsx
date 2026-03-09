"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      {subtitle && (
        <p className="text-gold-500 tracking-[0.3em] uppercase text-xs mb-3 font-medium">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-serif text-rose-800 mb-4">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-12 bg-gold-400" />
        <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
        <div className="h-px w-12 bg-gold-400" />
      </div>
      {description && (
        <p className="text-rose-600/60 max-w-lg mx-auto">{description}</p>
      )}
    </motion.div>
  );
}
