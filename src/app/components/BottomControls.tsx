"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bubbles as BubblesIcon } from "lucide-react";
import { Bubbles } from "./Bubbles";
import { FullscreenButton } from "./FullscreenButton";

function BubbleToggle({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onToggle}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="inline-flex items-center justify-center h-9 px-2.5 rounded-full border-[2px] border-ink overflow-hidden"
      style={{
        boxShadow: "var(--shadow-sm)",
        background: active ? "var(--color-paper)" : "var(--color-ink)",
        color: active ? "var(--color-ink)" : "var(--color-paper)",
      }}
      aria-label={active ? "Skjul bobler" : "Vis bobler"}
    >
      <BubblesIcon size={14} strokeWidth={2} className="flex-shrink-0" />

      <motion.span
        animate={{
          width: hovered ? 52 : 0,
          marginLeft: hovered ? 6 : 0,
          opacity: hovered ? 1 : 0,
        }}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="font-mono text-[11px] tracking-[0.06em] uppercase whitespace-nowrap overflow-hidden"
      >
        Bobler
      </motion.span>
    </motion.button>
  );
}

export function BottomControls() {
  const [showBubbles, setShowBubbles] = useState(true);

  return (
    <>
      {showBubbles && <Bubbles />}
      <div className="fixed bottom-3.5 left-3.5 z-40 flex items-center gap-2">
        <BubbleToggle
          active={showBubbles}
          onToggle={() => setShowBubbles((v) => !v)}
        />
        <FullscreenButton />
      </div>
    </>
  );
}
