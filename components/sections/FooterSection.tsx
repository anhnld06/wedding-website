"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, MapPin, CalendarDays, Facebook, Instagram, Youtube, Github } from "lucide-react";
import { useWeddingEventDate } from "@/hooks/use-wedding-event-date";
import { FOOTER_CONTENT } from "@/constants";

export default function FooterSection() {
  const { long: dateLong } = useWeddingEventDate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="footer"
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center snap-start snap-always overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950 via-rose-900 to-rose-950" />
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #d4a843, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold-400/30" />
            <Heart className="w-5 h-5 text-gold-400 fill-gold-400" />
            <div className="h-px w-12 bg-gold-400/30" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">
            {FOOTER_CONTENT.title}
          </h2>

          <p className="text-rose-200/50 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
            {FOOTER_CONTENT.description}
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-center gap-2 text-rose-200/60 text-sm">
              <CalendarDays className="w-4 h-4 text-gold-400/60" />
              <span>{dateLong}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-rose-200/60 text-sm">
              <MapPin className="w-4 h-4 text-gold-400/60" />
              <span>{FOOTER_CONTENT.venue}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gold-400/20" />
            <p className="text-gold-400/40 text-xs tracking-[0.2em] uppercase">
              {FOOTER_CONTENT.signOff}
            </p>
            <div className="h-px w-8 bg-gold-400/20" />
          </div>

          <p className="text-white/80 font-serif text-xl mt-3">
            {FOOTER_CONTENT.coupleNames}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <a
              href={FOOTER_CONTENT.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gold-400/60 hover:text-gold-400 hover:scale-110 transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={FOOTER_CONTENT.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gold-400/60 hover:text-gold-400 hover:scale-110 transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={FOOTER_CONTENT.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gold-400/60 hover:text-gold-400 hover:scale-110 transition-all duration-200"
              aria-label="TikTok"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
            <a
              href={FOOTER_CONTENT.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gold-400/60 hover:text-gold-400 hover:scale-110 transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={FOOTER_CONTENT.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gold-400/60 hover:text-gold-400 hover:scale-110 transition-all duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-rose-200/20 text-xs mt-1"
        >
          {FOOTER_CONTENT.madeWith}
        </motion.p>
      </div>
    </section>
  );
}
