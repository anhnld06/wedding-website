"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import Gallery from "@/components/Gallery";

interface Photo {
  id: string;
  url: string;
  width?: number | null;
  height?: number | null;
  caption?: string | null;
}

export default function AlbumSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPhotos(data);
        else setPhotos([]);
      })
      .catch(() => setPhotos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="album"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center snap-start overflow-hidden py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-white to-cream-100" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-gold-500 tracking-[0.3em] uppercase text-xs mb-3 font-medium">
            Khoảnh Khắc
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-rose-800 mb-4">
            Album Hình Cưới
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold-400/40" />
            <Heart className="w-4 h-4 text-rose-400 fill-rose-300" />
            <div className="h-px w-12 bg-gold-400/40" />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-500 rounded-full animate-spin mx-auto" />
            <p className="text-rose-600/60 text-sm mt-4">Đang tải...</p>
          </div>
        ) : (
          <Gallery photos={photos} />
        )}
      </div>
    </section>
  );
}
