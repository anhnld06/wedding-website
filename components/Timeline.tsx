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
    date: "18 Tháng 9, 2015",
    title: "Say 'I love you'",
    description: "Khoảnh khắc mà cả thế giới như khựng lại chỉ còn 'đôi ta'.",
  },
  {
    date: "18 Tháng 9, 2025",
    title: "Lời cầu hôn",
    description: "Làm vợ anh nhé? 💍",
  },
  {
    date: "16 Tháng 3, 2026",
    title: "Lễ đính hôn",
    description: "Chính thức đánh dấu bước khởi đầu cho hành trình về chung một nhà.",
  },
  {
    date: "29.03 & 04.04, 2026",
    title: "Lễ cưới",
    description: "Ngày chúng mình nói lời 'đồng ý' cho cả hành trình phía trước.",
  },
  {
    date: "18 Tháng 4, 2026",
    title: "Tiệc báo hỷ",
    description: "Một buổi tiệc nhỏ thân mật để chia sẻ niềm vui.",
  },
];

export default function Timeline() {
  return (
    <div className="relative max-w-3xl mx-auto px-2">

      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-rose-200 -translate-x-1/2" />

      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex items-start ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {/* Content */}
            <div className="w-1/2 px-3">
              <div
                className={`bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-rose-100 shadow-sm hover:shadow-md transition-shadow max-w-[260px] ${
                  index % 2 === 0 ? "ml-auto text-right" : "mr-auto text-left"
                }`}
              >
                <span className="text-xs text-gold-500 font-medium tracking-wide uppercase">
                  {event.date}
                </span>

                <h3 className="text-base font-serif text-rose-800 mt-1 mb-2">
                  {event.title}
                </h3>

                <p className="text-xs text-rose-700/60 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Timeline dot với tim đập */}
            <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center z-10 shadow-sm">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              </motion.div>
            </div>

            {/* Spacer */}
            <div className="w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}