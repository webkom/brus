"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export interface ToastData {
  id: number;
  type: "buy" | "refill" | "error";
  message: string;
  sub?: string;
}

const ACCENT: Record<ToastData["type"], string> = {
  buy: "var(--color-accent)",
  refill: "var(--color-green)",
  error: "var(--color-accent)",
};

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: number) => void;
}) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 3200);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.94 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className="flex items-center gap-3 bg-paper border-[3px] border-ink rounded-[4px] px-4 py-3 min-w-[200px]"
      style={{ boxShadow: "4px 4px 0 var(--ink)" }}
    >
      <span
        className="w-2.5 h-2.5 rounded-full flex-shrink-0 border-[1.5px] border-ink"
        style={{ background: ACCENT[toast.type] }}
      />
      <span className="font-display font-extrabold text-[15px] text-ink leading-none">
        {toast.message}
      </span>
      {toast.sub && (
        <span className="font-mono text-[12px] text-ink-soft ml-auto pl-2 whitespace-nowrap">
          {toast.sub}
        </span>
      )}
    </motion.div>
  );
}

export function Toast({
  toasts,
  onDismiss,
}: {
  toasts: ToastData[];
  onDismiss: (id: number) => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-16 right-4 z-[60] flex flex-col gap-2 items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem toast={t} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
