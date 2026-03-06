"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { ARIA_LABELS } from "@/constants";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/i-do.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  
    const handleFirstInteraction = () => {
      audioRef.current
        ?.play()
        .then(() => setPlaying(true))
        .catch(() => {});
  
      window.removeEventListener("click", handleFirstInteraction);
    };
  
    window.addEventListener("click", handleFirstInteraction);
  
    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-6 right-6 z-[150] w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      whileTap={{ scale: 0.9 }}
      aria-label={playing ? ARIA_LABELS.musicPause : ARIA_LABELS.musicPlay}
    >
      <motion.div
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={
          playing
            ? { duration: 3, repeat: Infinity, ease: "linear" }
            : { duration: 0.3 }
        }
      >
        <Music className={`w-4 h-4 ${playing ? "text-rose-500" : "text-rose-400"}`} />
      </motion.div>

      {/* Playing indicator ring */}
      {playing && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-rose-400/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
