"use client";

import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  s: number;
  x: number;
  d: number;
  delay: number;
  drift: number;
}

function randomBubbles(n: number): Bubble[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    s: 8 + Math.random() * 22,
    x: Math.random() * 100,
    d: 8 + Math.random() * 10,
    delay: -Math.random() * 15,
    drift: Math.random() * 120 - 60,
  }));
}

export function Bubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    setBubbles(randomBubbles(18));
  }, []);

  return (
    <div className="bubbles" aria-hidden="true">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={
            {
              "--s": `${b.s}px`,
              "--x": `${b.x}%`,
              "--d": `${b.d}s`,
              "--delay": `${b.delay}s`,
              "--drift": b.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
