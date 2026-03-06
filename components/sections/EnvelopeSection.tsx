"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";

interface EnvelopeSectionProps {
  onOpen: () => void;
}

export default function EnvelopeSection({ onOpen }: EnvelopeSectionProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpened(true);
      onOpen();
      setTimeout(() => {
        document.getElementById("reveal")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }, 1000);
  };

  return (
    <section
      id="envelope"
      ref={ref}
      className="relative h-screen flex items-center justify-center snap-start overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-rose-50/40 to-cream-50" />

      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-gold-500 tracking-[0.3em] uppercase text-xs mb-10 font-medium"
        >
          {isOpened ? "Envelope Opened" : "A Special Gift"}
        </motion.p>

        {/* Envelope */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={handleOpen}
          className={`relative cursor-pointer select-none ${isOpened ? "pointer-events-none" : ""}`}
        >
          {/* Envelope body */}
          <div className="relative w-72 sm:w-80 h-48 sm:h-52">
            {/* Back flap (triangle) */}
            <motion.div
              animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: "top center", perspective: 800 }}
              className="absolute top-0 left-0 right-0 z-20"
            >
              <div
                className="w-0 h-0 mx-auto"
                style={{
                  borderLeft: "144px solid transparent",
                  borderRight: "144px solid transparent",
                  borderTop: "100px solid #c9826e",
                }}
              />
              {/* Seal */}
              {!isOpening && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-rose-700 border-2 border-gold-400 flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-5 h-5 text-gold-300 fill-gold-300" />
                </motion.div>
              )}
            </motion.div>

            {/* Envelope front */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#d4956f] to-[#c9826e] rounded-b-lg shadow-2xl z-10" />

            {/* Card inside (visible when opened) */}
            <motion.div
              initial={{ y: 0 }}
              animate={isOpening ? { y: -80 } : { y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute inset-x-4 top-4 bottom-4 bg-cream-50 rounded-md shadow-md z-[5] flex items-center justify-center"
            >
              <div className="text-center p-4">
                <p className="text-rose-800 font-serif text-sm mb-1">
                  With Love
                </p>
                <p className="text-rose-600/60 text-xs">
                  Anh & Châu
                </p>
              </div>
            </motion.div>
          </div>

          {/* Click hint */}
          {!isOpened && !isOpening && (
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center text-rose-600/50 text-sm mt-8 tracking-wide"
            >
              Tap to open the envelope
            </motion.p>
          )}
        </motion.div>

        {/* Opened state */}
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <p className="text-rose-600/60 text-sm">
              Kéo xuống để xem điều bất ngờ bên trong
            </p>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-3 text-rose-400"
            >
              ↓
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
