"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

const events: TimelineEvent[] = [
  {
    date: "Tháng 9, 2015",
    title: "Say 'I love you'",
    description: "Khoảnh khắc mà cả thế giới như khựng lại chỉ còn 'đôi ta'.",
  },
  {
    date: "Tháng 9, 2025",
    title: "Lời cầu hôn",
    description:
      "Làm vợ anh nhé? 💍",
  },
  {
    date: "29/03 & 04/04/2026",
    title: "Ngày cưới",
    description:
      "Ngày chúng mình chính thức trở thành gia đình của nhau.",
  },
];

export default function Timeline() {
  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-rose-200 -translate-x-1/2 hidden md:block" />
      <div className="absolute left-8 top-0 bottom-0 w-px bg-rose-200 md:hidden" />

      <div className="space-y-12 md:space-y-16">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex items-start gap-6 md:gap-0 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Mobile dot */}
            <div className="absolute left-8 w-6 h-4 rounded-full bg-rose-400 border-4 border-cream-50 -translate-x-1/2 md:hidden z-10 mt-1" />

            {/* Content */}
            <div className="flex-1 ml-14 md:ml-0 md:w-1/2 md:px-8">
              <div
                className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-sm hover:shadow-md transition-shadow ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <span className="text-gold-500 text-sm font-medium tracking-wide uppercase">
                  {event.date}
                </span>
                <h3 className="text-xl font-serif text-rose-800 mt-1 mb-3">
                  {event.title}
                </h3>
                <p className="text-rose-700/60 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Desktop dot */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-rose-100 border-4 border-cream-50 items-center justify-center z-10">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </div>

            {/* Spacer for other side */}
            <div className="hidden md:block md:w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
