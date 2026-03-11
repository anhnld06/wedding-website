"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Send, Check, Heart, Lightbulb, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  WISH_SUGGESTIONS,
  WEDDING_EMOJIS,
  FALLBACK_WISHES,
  MESSAGES,
  PLACEHOLDERS,
  WISH_FORM_LABELS,
} from "@/constants";

interface WishEntry {
  id: string;
  name: string;
  message: string | null;
  createdAt: string;
}

export default function WishSection() {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isNarrow = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [suggestionDropdownPos, setSuggestionDropdownPos] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const suggestionDropdownRef = useRef<HTMLDivElement>(null);
  const [wishes, setWishes] = useState<WishEntry[]>([]);
  const [loadingWishes, setLoadingWishes] = useState(true);

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/rsvp");
      if (res.ok) {
        const data = await res.json();
        setWishes(
          (Array.isArray(data) ? data : [])
            .filter((r: { message?: string | null }) => r.message?.trim())
            .map((r: { id: string; name: string; message: string | null; createdAt: string }) => ({
              id: r.id,
              name: r.name,
              message: r.message,
              createdAt: r.createdAt,
            }))
        );
      }
    } catch {
      setWishes([]);
    } finally {
      setLoadingWishes(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inContainer = containerRef.current?.contains(target);
      const inSuggestionDropdown = suggestionDropdownRef.current?.contains(target);
      if (!inContainer && !inSuggestionDropdown) {
        setShowSuggestions(false);
        setShowEmojis(false);
      }
    };
    if (showSuggestions || showEmojis) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showSuggestions, showEmojis]);

  useEffect(() => {
    if (!showSuggestions || !containerRef.current) return;
    const updatePosition = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSuggestionDropdownPos({
          top: rect.bottom + 8,
          left: rect.left,
          width: rect.width,
        });
      }
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [showSuggestions]);

  const applyWish = (text: string) => {
    setMessage((prev) => (prev.trim() ? `${prev.trim()} ${text}` : text));
    setShowSuggestions(false);
  };

  const insertEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojis(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    try {
      setSubmitting(true);
      setError("");

      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          attending: true,
          guests: 1,
          message: message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Không gửi được. Vui lòng thử lại.");

      setSubmitted(true);
      setName("");
      setMessage("");
      fetchWishes();
    } catch (err) {
      setError(err instanceof Error ? err.message : MESSAGES.wishSubmitError);
    } finally {
      setSubmitting(false);
    }
  };

  const displayWishes =
    wishes.length > 0
      ? wishes.map((w) => ({ name: w.name, message: w.message || "" }))
      : FALLBACK_WISHES;

  return (
    <section
      id="wish"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center snap-start overflow-hidden py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-rose-50/30 to-cream-100" />
      <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-rose-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-gold-200/10 rounded-full blur-3xl" />

      {/* Floating bubbles - 3 lanes × 4 trên mobile, 5 lanes × 4 trên desktop */}
      <div className="absolute inset-0 pointer-events-none">
        {displayWishes
          .slice(0, isNarrow ? 8 : isTablet ? 12 : 20)
          .map((wish, index) => (
            <WishBubble
              key={`${wish.name}-${index}`}
              name={wish.name}
              message={wish.message}
              index={index}
              total={Math.min(displayWishes.length, isNarrow ? 8 : isTablet ? 12 : 20)}
              laneCount={isNarrow ? 1 : isTablet ? 2 : 5}
            />
          ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p className="text-gold-500 tracking-[0.3em] uppercase text-xs mb-4 font-medium">
            Guestbook
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-rose-800 mb-3">
            Send Your Wishes
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gold-400/40" />
            <Heart className="w-4 h-4 text-rose-400 fill-rose-300" />
            <div className="h-px w-12 bg-gold-400/40" />
          </div>
        </motion.div>

        {/* Form - giữ nguyên */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-rose-100 shadow-sm text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-rose-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif text-rose-800 mb-2">Cảm ơn bạn!</h3>
              <p className="text-rose-600/60 text-sm mb-4">
                Lời chúc của bạn đã được gửi đến đôi tân hôn.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-rose-600 text-sm font-medium hover:text-rose-700 underline"
              >
                Gửi thêm lời chúc
              </button>
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400 mx-auto mt-4 block" />
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-rose-100 shadow-sm space-y-5"
            >
              {error && (
                <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100">
                  {error}
                </p>
              )}

              <div>
                <label
                  htmlFor="wish-name"
                  className="block text-sm font-medium text-rose-800 mb-2"
                >
                  {WISH_FORM_LABELS.yourName}
                </label>
                <input
                  id="wish-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={PLACEHOLDERS.enterYourName}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-xl border border-rose-200 bg-white/80",
                    "text-rose-900 placeholder:text-rose-300",
                    "focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent",
                    "transition-all duration-200"
                  )}
                />
              </div>

              <div ref={containerRef} className="relative">
                <label
                  htmlFor="wish-message"
                  className="block text-sm font-medium text-rose-800 mb-2"
                >
                  {WISH_FORM_LABELS.yourMessage}
                </label>
                <textarea
                  id="wish-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={PLACEHOLDERS.wishMessage}
                  required
                  className={cn(
                    "w-full px-4 py-3 pr-14 rounded-xl border border-rose-200 bg-white/80 resize-none",
                    "text-rose-900 placeholder:text-rose-300",
                    "focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent",
                    "transition-all duration-200"
                  )}
                />
                <div className="absolute bottom-3 right-3 flex gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmojis(false);
                      if (containerRef.current && !showSuggestions) {
                        const rect = containerRef.current.getBoundingClientRect();
                        setSuggestionDropdownPos({
                          top: rect.bottom + 8,
                          left: rect.left,
                          width: rect.width,
                        });
                      }
                      setShowSuggestions((s) => !s);
                    }}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      showSuggestions
                        ? "bg-rose-200 text-rose-700"
                        : "bg-rose-50/80 text-rose-600 hover:bg-rose-100"
                    )}
                    title={WISH_FORM_LABELS.suggestionTitle}
                  >
                    <Lightbulb className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSuggestions(false);
                      setShowEmojis((e) => !e);
                    }}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      showEmojis
                        ? "bg-rose-200 text-rose-700"
                        : "bg-rose-50/80 text-rose-600 hover:bg-rose-100"
                    )}
                    title={WISH_FORM_LABELS.emojiTitle}
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
                {showSuggestions &&
                  createPortal(
                    <motion.div
                      ref={suggestionDropdownRef}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="fixed z-[100] rounded-xl border border-rose-200 bg-white shadow-lg overflow-hidden"
                      style={{
                        top: suggestionDropdownPos.top,
                        left: suggestionDropdownPos.left,
                        width: suggestionDropdownPos.width,
                      }}
                    >
                      <div className="max-h-64 overflow-y-auto p-2">
                        {WISH_SUGGESTIONS.map((wish, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => applyWish(wish)}
                            className={cn(
                              "w-full text-left px-3 py-3 rounded-lg text-sm text-rose-800",
                              "hover:bg-rose-50 transition-colors",
                              i > 0 && "border-t border-rose-100"
                            )}
                          >
                            {wish}
                          </button>
                        ))}
                      </div>
                    </motion.div>,
                    document.body
                  )}
                {showEmojis && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full right-3 mb-1 z-20"
                  >
                    <div className="flex flex-wrap gap-1 p-2 bg-white rounded-lg shadow-lg border border-rose-200 max-w-[200px]">
                      {WEDDING_EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => insertEmoji(emoji)}
                          className="w-8 h-8 flex items-center justify-center rounded hover:bg-rose-50 text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || !name.trim() || !message.trim()}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl",
                  "bg-rose-500 text-white font-medium tracking-wide",
                  "hover:bg-rose-600 transition-all duration-200",
                  "shadow-lg shadow-rose-200/50",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {WISH_FORM_LABELS.sendWishes}
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function WishBubble({
  name,
  message,
  index,
  total,
  laneCount = 5,
}: {
  name: string;
  message: string;
  index: number;
  total: number;
  laneCount?: number;
}) {
  const duration = 22 + (index % 7);
  const repeatDelay = 10 + (index % 5);
  const laneIndex = index % laneCount;
  // 1 lane: 50 (center). 2 lanes: 25, 75. 3 lanes: 25, 50, 75. 5 lanes: 18, 37, 55, 73, 88
  const leftPercent =
    laneCount === 1
      ? 50
      : laneCount === 2
        ? 25 + laneIndex * 50
        : laneCount === 3
          ? 25 + laneIndex * 25
          : 18 + laneIndex * ((88 - 18) / 4);
  // 1 lane: liền kề nhau, cách ~10px (delay ~4s). Nhiều lane: stagger theo cycle
  const delay =
    laneCount === 1
      ? index * 4
      : Math.floor(index / laneCount) * (duration + repeatDelay) + laneIndex * 2;

  return (
    <motion.div
      className="absolute w-[280px] max-w-[85vw] sm:w-[200px] sm:max-w-[55vw] md:w-[240px] pointer-events-none"
      style={{ left: `${leftPercent}%`, bottom: 0, zIndex: index }}
      initial={{ opacity: 0, x: "-50%" }}
      animate={{
        x: "-50%", // căn giữa bubble tại left%
        opacity: [0, 0.95, 0.95, 0.5, 0],
        y: ["0vh", "-30vh", "-70vh", "-100vh", "-110vh"],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay,
        times: [0, 0.25, 0.5, 0.8, 1],
      }}
    >
      {/* Coral shadow layer - offset behind */}
      <div
        className="absolute inset-0 rounded-[22px] translate-x-1.5 translate-y-1.5"
        style={{ backgroundColor: "#f7a092" }}
      />
      {/* Main bubble - mint/teal */}
      <div className="relative rounded-2xl px-4 py-3 bg-[#99ddcc] text-rose-900 shadow-sm overflow-hidden min-w-0">
        {/* Sparkle accents - top right */}
        <div className="absolute top-2 right-2 flex gap-0.5 shrink-0 z-10">
          <span
            className="inline-block w-1.5 h-3 bg-[#ffd93d] opacity-90"
            style={{ transform: "rotate(-20deg)" }}
          />
          <span
            className="inline-block w-1.5 h-2.5 bg-[#ffd93d] opacity-80"
            style={{ transform: "rotate(15deg)" }}
          />
          <span
            className="inline-block w-1 h-2 bg-[#ffd93d] opacity-70"
            style={{ transform: "rotate(40deg)" }}
          />
        </div>
        {/* Content - full text */}
        <div className="relative z-0 pr-6">
          <p className="font-semibold text-rose-800 text-sm mb-1.5">{name}</p>
          <p className="text-rose-700/90 text-sm leading-loose break-words whitespace-pre-wrap [overflow-wrap:anywhere] [line-height:1.6]">
            {message}
          </p>
        </div>
        {/* Speech bubble tail - bottom left */}
        <div
          className="absolute -bottom-2 left-4 w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "12px solid #99ddcc",
            transform: "rotate(-15deg)",
          }}
        />
      </div>
    </motion.div>
  );
}
