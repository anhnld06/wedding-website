"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";

interface PersonInfo {
  name: string;
  role: string;
  image: string;
  parent: string;
  description: string;
}

const groom: PersonInfo = {
  name: "Nguyễn Lê Duy Anh",
  role: "Quý Nam",
  image: "/images/chu-re.jpg",
  parent: "Con trai Ông Nguyễn Duy Thức & Bà Lê Thị Tuyến",
  description: "Một người đàn ông trưởng thành, luôn yêu thương và trân trọng gia đình.",
};

const bride: PersonInfo = {
  name: "Nguyễn Hà Bảo Châu",
  role: "Quý Nữ",
  image: "/images/co-dau.jpg",
  parent: "Con gái Ông Nguyễn Huy Phước Long & Bà Hà Thị Thủy",
  description: "Cô gái dịu dàng với nụ cười ấm áp, luôn mang đến niềm vui cho mọi người.",
};

function PersonCard({
  person,
  delay,
  isInView,
}: {
  person: PersonInfo;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-center text-center"
    >
      {/* Avatar with decorative ring */}
      <div className="relative mb-5">
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl">
          <Image
            src={person.image}
            alt={person.name}
            width={176}
            height={176}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-gold-400/30 scale-110" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-gold-400/20 scale-125"
        />
      </div>

      <p className="text-gold-400 tracking-[0.2em] uppercase text-xs mb-1 font-medium">
        {person.role}
      </p>
      <h3 className="text-4xl sm:text-5xl font-serif text-white mb-4" style={{ fontFamily: '"BucThu", var(--font-serif), serif' }}>
        {person.name}
      </h3>
      <p className="text-rose-200/60 text-xs mb-2" style={{ fontFamily: '"Moonlight", var(--font-serif), serif' }}>{person.parent}</p>
      <p className="text-rose-200/70 text-sm max-w-[240px] leading-relaxed">
        {person.description}
      </p>
    </motion.div>
  );
}

export default function CoupleSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      id="couple"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center snap-start overflow-hidden py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950 via-rose-900 to-rose-950" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #d4a843 0%, transparent 50%), radial-gradient(circle at 70% 60%, #d4a843 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-gold-400 tracking-[0.3em] uppercase text-xs mb-3 font-medium">
            Cặp Đôi
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">
            Chú Rể & Cô Dâu
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold-400/40" />
            <Heart className="w-4 h-4 text-gold-400 fill-gold-400/50" />
            <div className="h-px w-12 bg-gold-400/40" />
          </div>
        </motion.div>

        {/* Couple cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center">
          <PersonCard person={groom} delay={0.3} isInView={isInView} />

          {/* Heart divider (desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm shadow-lg border border-gold-400/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-gold-400 fill-gold-400/70" />
            </div>
          </motion.div>

          {/* Mobile heart divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:hidden flex justify-center -my-4"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm shadow-md border border-gold-400/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-gold-400 fill-gold-400/70" />
            </div>
          </motion.div>

          <PersonCard person={bride} delay={0.6} isInView={isInView} />
        </div>
      </div>
    </section>
  );
}
