"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Download } from "lucide-react";
import Image from "next/image";
import { BANK_ACCOUNTS, ARIA_LABELS } from "@/constants";

const FireWork = dynamic(() => import("@/components/FireWork"), { ssr: false });

export default function QRCodeFloat() {
  const [open, setOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [labelVisible, setLabelVisible] = useState(false);

  useEffect(() => {
    if (open) return;
    if (labelVisible) {
      const hide = setTimeout(() => setLabelVisible(false), 2500);
      return () => clearTimeout(hide);
    } else {
      const show = setTimeout(() => setLabelVisible(true), 5000);
      return () => clearTimeout(show);
    }
  }, [labelVisible, open]);

  useEffect(() => {
    if (open) setLabelVisible(false);
  }, [open]);

  const handleDownload = async (url: string, role: string) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `qr-mung-cuoi-${role.replace(/\s+/g, "-").toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(url, "_blank");
    }
  };

  const handleCopy = (account: string | number) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(String(account)).then(
        () => {
          setCopiedAccount(String(account));
          setTimeout(() => setCopiedAccount(null), 2000);
        },
        () => {
          // fallback: do nothing if copy fails
        }
      );
    }
  };

  return (
    <>
      {/* Floating chibi button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[150] group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        aria-label={ARIA_LABELS.weddingGift}
      >
        <motion.div
          className="relative"
          animate={
            labelVisible && !open
              ? { x: [0, -4, 4, -3, 3, -2, 2, 0] }
              : { x: 0 }
          }
          transition={{
            x: labelVisible && !open
              ? { duration: 0.5, ease: "easeOut" }
              : { duration: 0.2 },
          }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-yellow-400 flex items-center justify-center shadow-lg border-2 border-white">
            <Image
              src="/images/swans.png"
              alt="Wedding hands and heart"
              width={40}
              height={40}
              className="w-8 h-8 object-contain"
              priority
            />
          </div>
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-rose-400/40 animate-ping" />
          {/* Label - ẩn ban đầu, 5s sau hiện nảy bóng 2–3s rồi mất, lặp lại. Tắt khi modal mở */}
          <AnimatePresence>
            {labelVisible && !open && (
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  y: [0, -12, 0, -8, 0, -5, 0, -2, 0],
                  scale: [1, 1.1, 1, 1.08, 1, 1.05, 1, 1.02, 1],
                }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                transition={{
                  opacity: { duration: 0.2 },
                  y: {
                    duration: 2.2,
                    times: [0, 0.12, 0.24, 0.4, 0.56, 0.7, 0.84, 0.94, 1],
                    ease: "easeOut",
                  },
                  scale: {
                    duration: 2.2,
                    times: [0, 0.12, 0.24, 0.4, 0.56, 0.7, 0.84, 0.94, 1],
                    ease: "easeOut",
                  },
                }}
              >
                <div className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                  Mừng cưới
                </div>
                {/* Mũi nhọn trỏ xuống QR float */}
                <div
                  className="w-0 h-0 -mt-px border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-rose-500"
                  aria-hidden
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>

      {/* QR Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md max-h-[90dvh] rounded-[32px] bg-gradient-to-b from-[#f6ecff] via-[#f9f0ff] to-[#fdefff] p-3 sm:p-4 md:p-5 shadow-[0_18px_55px_rgba(125,84,187,0.55)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-1.5 text-purple-400 hover:text-purple-600 transition-colors"
                aria-label={ARIA_LABELS.close}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-3 sm:mb-4 md:mb-5">
                <p className="text-gold-500 tracking-[0.2em] uppercase text-[10px] mb-1 font-medium">
                  Wedding Gift
                </p>
                <h3 className="text-lg font-serif text-rose-800">
                  Mừng Cưới
                </h3>
              </div>

              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {open && <FireWork />}
                {BANK_ACCOUNTS.map((acc) => (
                  <div
                    key={acc.role}
                    className="rounded-[26px] bg-white/95 px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 border border-purple-50 shadow-[0_14px_40px_rgba(137,97,200,0.23)]"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${acc.color} flex items-center justify-center text-lg shadow-sm overflow-hidden`}
                      >
                        <Image src={acc.avatar} alt={acc.role} width={40} height={40} className="w-full h-full object-cover rounded-full" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-rose-800">
                          {acc.role}
                        </p>
                        <p className="text-xs text-rose-500/60">{acc.name}</p>
                      </div>
                    </div>

                    {/* QR Code placeholder using API */}
                    <div className="group/qr relative bg-white rounded-xl p-2 sm:p-2.5 md:p-3 flex items-center justify-center border border-rose-100">
                      <Image
                        src={acc.qr_api}
                        alt={`QR ${acc.role}`}
                        width={200}
                        height={200}
                        className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={() => handleDownload(acc.qr_api, acc.role)}
                        className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 transition-opacity duration-200 group-hover/qr:opacity-100 hover:bg-black/50"
                        aria-label={`Tải mã QR ${acc.role}`}
                      >
                        <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-medium text-rose-700 shadow-md">
                          <Download className="w-4 h-4" />
                          Tải xuống
                        </span>
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-rose-600/50">
                      <p>
                        {acc.bank} — {acc.account}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleCopy(acc.account)}
                        className="flex items-center justify-center rounded-full bg-rose-50 px-1.5 py-1 text-[10px] text-rose-500 hover:bg-rose-100 hover:text-rose-700 transition-colors border border-rose-100"
                        aria-label="Sao chép số tài khoản"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      {copiedAccount === String(acc.account) && (
                        <span className="text-[10px] text-emerald-500">
                          ✓
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-rose-400/40 text-[10px] mt-3 sm:mt-4">
                Quét mã QR bằng app ngân hàng
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
