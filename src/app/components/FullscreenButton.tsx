"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";

export function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const update = () =>
      setIsFullscreen(
        !!(
          document.fullscreenElement ??
          (document as any).webkitFullscreenElement
        ),
      );
    document.addEventListener("fullscreenchange", update);
    document.addEventListener("webkitfullscreenchange", update);
    return () => {
      document.removeEventListener("fullscreenchange", update);
      document.removeEventListener("webkitfullscreenchange", update);
    };
  }, []);

  function toggle() {
    const el = document.documentElement as any;
    if (
      !document.fullscreenElement &&
      !(document as any).webkitFullscreenElement
    ) {
      el.requestFullscreen?.() ?? el.webkitRequestFullscreen?.();
    } else {
      (document as any).exitFullscreen?.() ??
        (document as any).webkitExitFullscreen?.();
    }
  }

  const textWidth = isFullscreen ? 58 : 82;

  return (
    <motion.button
      onClick={toggle}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="inline-flex items-center justify-center h-9 px-2.5 rounded-full border-[2px] border-ink bg-paper overflow-hidden"
      style={{ boxShadow: "var(--shadow-sm)" }}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? (
        <Minimize2 size={14} strokeWidth={2} className="flex-shrink-0" />
      ) : (
        <Maximize2 size={14} strokeWidth={2} className="flex-shrink-0" />
      )}

      <motion.span
        animate={{
          width: hovered ? textWidth : 0,
          marginLeft: hovered ? 6 : 0,
          opacity: hovered ? 1 : 0,
        }}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="font-mono text-[11px] tracking-[0.06em] uppercase whitespace-nowrap overflow-hidden"
      >
        {isFullscreen ? "Avslutt" : "Fullskjerm"}
      </motion.span>
    </motion.button>
  );
}
