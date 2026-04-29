"use client";

import { motion, useAnimation } from "framer-motion";

export function StreakB() {
  const letterControls = useAnimation();
  const streakControls = useAnimation();

  async function handleClick() {
    letterControls.start({
      scale: [1, 0.75, 1.15, 0.93, 1],
      rotate: [0, -14, 7, -3, 0],
      transition: { duration: 0.45, times: [0, 0.18, 0.48, 0.72, 1] },
    });

    await streakControls.start({ scaleX: 0, transition: { duration: 0.04 } });
    streakControls.start({
      scaleX: 1,
      transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
    });
  }

  return (
    <motion.span
      className="relative inline-block cursor-pointer select-none"
      animate={letterControls}
      onClick={handleClick}
    >
      B
      <motion.span
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          left: "-5%",
          right: "-40%",
          top: "80%",
          height: "0.07em",
          background: "var(--color-ink)",
          transformOrigin: "left center",
        }}
        initial={{ y: "-50%", rotate: -40, scaleX: 0 }}
        animate={streakControls}
      />
    </motion.span>
  );
}
