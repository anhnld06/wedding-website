"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy } from "lucide-react";
import Image from "next/image";
import FireWork from "@/components/FireWork";
import { BANK_ACCOUNTS, ARIA_LABELS } from "@/constants";

export default function QRCodeFloat() {
  const [open, setOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

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
        <div className="relative">
          {/* Chibi couple */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-gold-500 flex items-center justify-center shadow-lg shadow-rose-300/40 border-2 border-white">
            <span className="text-2xl leading-none">💑</span>
          </div>
          {/* Pulsing ring */}
          <div className="absolute inset-0 rounded-full border-2 border-rose-400/40 animate-ping" />
          {/* Label */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
            Mừng cưới
          </div>
        </div>
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
              className="relative w-full max-w-sm rounded-[32px] bg-gradient-to-b from-[#f6ecff] via-[#f9f0ff] to-[#fdefff] p-5 shadow-[0_18px_55px_rgba(125,84,187,0.55)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 p-1.5 text-purple-400 hover:text-purple-600 transition-colors"
                aria-label={ARIA_LABELS.close}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-5">
                <p className="text-gold-500 tracking-[0.2em] uppercase text-[10px] mb-1 font-medium">
                  Wedding Gift
                </p>
                <h3 className="text-lg font-serif text-rose-800">
                  Mừng Cưới
                </h3>
              </div>

              <div className="space-y-4">
                <FireWork />
                {BANK_ACCOUNTS.map((acc) => (
                  <div
                    key={acc.role}
                    className="rounded-[26px] bg-white/95 px-6 py-5 border border-purple-50 shadow-[0_14px_40px_rgba(137,97,200,0.23)]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${acc.color} flex items-center justify-center text-lg shadow-sm`}
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
                    <div className="bg-white rounded-xl p-3 flex items-center justify-center border border-rose-100">
                      <Image
                        src={acc.qr_api}
                        alt={`QR ${acc.role}`}
                        width={200}
                        height={200}
                        className="w-48 h-48 object-contain"
                        unoptimized
                      />
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

              <p className="text-center text-rose-400/40 text-[10px] mt-4">
                Quét mã QR bằng app ngân hàng
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
