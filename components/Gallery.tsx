"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { MESSAGES, ALBUM_LABELS } from "@/constants";

interface Photo {
  id: string;
  url: string;
  width?: number | null;
  height?: number | null;
  caption?: string | null;
}

interface GalleryProps {
  photos: Photo[];
}

const POLAROID_LAYOUTS = [
  { rotate: -10, translateY: -40, zIndex: 1 },
  { rotate: 0, translateY: -6, zIndex: 3 },
  { rotate: 10, translateY: -50, zIndex: 2 },
];

function Feather({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 120"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 2C30 2 10 30 8 60C6 90 20 115 30 118C40 115 54 90 52 60C50 30 30 2 30 2Z"
        fill="currentColor"
        opacity="0.15"
      />
      <path
        d="M30 2C30 2 20 40 22 70C24 100 30 118 30 118"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />
      <path
        d="M30 30C25 35 15 45 12 58"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.15"
      />
      <path
        d="M30 50C35 55 45 62 48 72"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.15"
      />
    </svg>
  );
}

export default function Gallery({ photos }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const slides = photos.map((p) => ({
    src: p.url,
    alt: p.caption || "Wedding photo",
    width: p.width ?? 1200,
    height: p.height ?? 800,
    title: p.caption ?? undefined,
  }));

  if (photos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-rose-400 text-lg">{MESSAGES.noPhotosYet}</p>
      </div>
    );
  }

  const heroPhotos = photos.slice(0, 3);

  return (
    <>
      {/* Hero: Polaroid collage — first 3 photos */}
      <div className="relative">
        <Feather className="absolute -top-6 -right-4 w-8 h-16 text-rose-400/60 rotate-[30deg] hidden md:block" />
        <Feather className="absolute -bottom-8 -left-6 w-7 h-14 text-rose-300/50 rotate-[-20deg] hidden md:block" />
        <Feather className="absolute top-1/2 -right-10 w-6 h-12 text-rose-400/40 rotate-[60deg] hidden lg:block" />

        <div className="flex items-center justify-center py-4">
          {heroPhotos.map((photo, i) => {
            const layout = POLAROID_LAYOUTS[i];
            const isCenter = i === 1;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  y: layout.translateY,
                  rotate: layout.rotate,
                }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  rotate: 0,
                  scale: 1.06,
                  zIndex: 10,
                  y: 0,
                  transition: { duration: 0.3 },
                }}
                onClick={() => openLightbox(i)}
                className="cursor-pointer -mx-3 sm:-mx-4 md:-mx-5 first:ml-0 last:mr-0"
                style={{ zIndex: layout.zIndex, position: "relative" }}
              >
                <div className={`bg-white p-2 sm:p-3 ${isCenter ? "pb-2 sm:pb-3" : "pb-6 sm:pb-8"} shadow-[0_4px_20px_rgba(0,0,0,0.12)] rounded-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-shadow duration-300`}>
                  <div className="overflow-hidden w-[140px] h-[185px] sm:w-[200px] sm:h-[265px] md:w-[260px] md:h-[345px] lg:w-[280px] lg:h-[370px]">
                    <Image
                      src={photo.url}
                      alt={photo.caption || "Wedding photo"}
                      width={photo.width || 600}
                      height={photo.height || 800}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      sizes="(max-width: 640px) 140px, (max-width: 768px) 200px, (max-width: 1024px) 260px, 280px"
                    />
                  </div>
                  {isCenter && (
                    <p className="text-center text-[10px] sm:text-xs md:text-sm text-rose-800/80 mt-1 sm:mt-1.5 font-serif italic">
                      love is in the air
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Xem album button — opens full lightbox gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 md:mt-16 flex justify-center"
      >
        <button
          type="button"
          onClick={() => openLightbox(0)}
          className={`
            inline-flex items-center gap-2 px-6 py-3 rounded-3xl font-medium
            bg-rose-600/70 text-white
            hover:bg-rose-600 transition-colors
            shadow-md hover:shadow-lg
          `}
        >
          <Images className="w-5 h-5" />
          {ALBUM_LABELS.viewAllImages}
        </button>
      </motion.div>

      {/* Yet Another React Lightbox — zoom, thumbnails, full gallery */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails, Captions, Slideshow, Counter, Fullscreen, Download]}
        slideshow={{ autoplay: true, delay: 3000 }}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          gap: 8,
        }}
      />
    </>
  );
}
