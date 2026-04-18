"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/[]";

interface DecryptedTextProps {
  active: boolean;
  className?: string;
  speedMs?: number;
  text: string;
}

export function DecryptedText({ active, className, speedMs = 22, text }: DecryptedTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }

    let step = 0;
    const totalSteps = Math.max(text.replace(/\s+/g, "").length * 4, 12);
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      step += 1;
      const revealCount = Math.floor((step / totalSteps) * text.length);

      const next = text
        .split("")
        .map((character, index) => {
          if (character === " ") {
            return " ";
          }

          if (index < revealCount) {
            return text[index] ?? character;
          }

          return GLYPHS[(index + step) % GLYPHS.length] ?? character;
        })
        .join("");

      setDisplay(step >= totalSteps ? text : next);

      if (step < totalSteps) {
        timeoutId = setTimeout(tick, speedMs);
      }
    };

    setDisplay(text.replace(/[^\s]/g, " "));
    timeoutId = setTimeout(tick, speedMs);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [active, speedMs, text]);

  return (
    <span aria-label={text} className={className}>
      {display}
    </span>
  );
}
