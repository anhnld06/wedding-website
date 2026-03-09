"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import { isVuQuyPhase, isThanhHonPhase } from "@/lib/wedding-dates";
import {
  VU_QUY_DATE,
  THANH_HON_DATE,
  MARCH_2026,
  APRIL_2026,
  DAY_LABELS,
  COUNTDOWN_UNIT_LABELS,
  EVENT_LABELS,
} from "@/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}


export default function CountdownSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [targetDate, setTargetDate] = useState(VU_QUY_DATE);
  const [label, setLabel] = useState<string>(EVENT_LABELS.vuQuyFull);
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [calendar, setCalendar] = useState<typeof MARCH_2026 | typeof APRIL_2026>(MARCH_2026);

  useEffect(() => {
    const update = () => {
      if (isVuQuyPhase()) {
        setTargetDate(VU_QUY_DATE);
        setLabel(EVENT_LABELS.vuQuy);
        setCalendar(MARCH_2026);
        setTime(calcTimeLeft(VU_QUY_DATE));
      } else if (isThanhHonPhase()) {
        setTargetDate(THANH_HON_DATE);
        setLabel(EVENT_LABELS.thanhHon);
        setCalendar(APRIL_2026);
        setTime(calcTimeLeft(THANH_HON_DATE));
      } else {
        setCalendar(APRIL_2026);
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const units: { label: string; value: number }[] = time
    ? [
        { label: COUNTDOWN_UNIT_LABELS.days, value: time.days },
        { label: COUNTDOWN_UNIT_LABELS.hours, value: time.hours },
        { label: COUNTDOWN_UNIT_LABELS.minutes, value: time.minutes },
        { label: COUNTDOWN_UNIT_LABELS.seconds, value: time.seconds },
      ]
    : [];

  const isPast = time && time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  // Build calendar grid from current event (vu quy = March, thành hôn = April)
  const blanks = Array(calendar.firstDay).fill(null);
  const days = Array.from({ length: calendar.daysInMonth }, (_, i) => i + 1);
  const calendarDays = [...blanks, ...days];

  return (
    <section
      id="countdown"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center snap-start overflow-hidden py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950 via-rose-900 to-rose-950" />
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 30%, #d4a843 0%, transparent 50%), radial-gradient(circle at 70% 70%, #d4a843 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <p className="text-gold-400 tracking-[0.3em] uppercase text-xs mb-3 font-medium">
            Save The Date
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-2">
            Đếm Ngược
          </h2>
          <p className="text-rose-200/70 text-sm">{label}</p>
        </motion.div>

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 sm:gap-5 mb-10"
        >
          {(time && !isPast
            ? units
            : [
                { label: COUNTDOWN_UNIT_LABELS.days, value: 0 },
                { label: COUNTDOWN_UNIT_LABELS.hours, value: 0 },
                { label: COUNTDOWN_UNIT_LABELS.minutes, value: 0 },
                { label: COUNTDOWN_UNIT_LABELS.seconds, value: 0 },
              ]
          ).map(({ label: l, value }) => (
            <div key={l} className="text-center">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-gold-400/20 flex items-center justify-center shadow-lg">
                <span className="text-2xl sm:text-3xl font-serif text-gold-300">
                  {time && !isPast ? String(value).padStart(2, "0") : "--"}
                </span>
              </div>
              <p className="text-[10px] text-rose-200/40 mt-2 uppercase tracking-wider">{l}</p>
            </div>
          ))}
        </motion.div>

        {isPast && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center text-gold-400 font-serif text-lg mb-8"
          >
            Sự kiện đã diễn ra
          </motion.p>
        )}

        {/* Calendar: March (vu quy) or April (thành hôn) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/[0.06] backdrop-blur-sm rounded-2xl border border-gold-400/20 p-4 sm:p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gold-400 font-serif text-lg">{calendar.monthName}</span>
            <span className="text-rose-200/80 text-sm">2026</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAY_LABELS.map((d) => (
              <div key={d} className="text-[10px] text-rose-200/40 uppercase py-1">
                {d}
              </div>
            ))}
            {calendarDays.map((day, i) =>
              day === null ? (
                <div key={`empty-${i}`} />
              ) : day === calendar.highlightDay ? (
                <div key={day} className="relative flex items-center justify-center py-2">
                  <motion.div
                    className="absolute"
                    animate={
                      isInView
                        ? {
                            scale: [1.1, 1.5, 1.1],
                            transition: {
                              duration: 1.2,
                              repeat: Infinity,
                              repeatDelay: 1,
                            },
                          }
                        : {}
                    }
                  >
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-400 fill-rose-400" />
                  </motion.div>
                  <span className="relative z-10 text-white font-serif font-semibold text-sm">
                    {day}
                  </span>
                </div>
              ) : (
                <div
                  key={day}
                  className="py-2 text-rose-200/60 text-sm"
                >
                  {day}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
