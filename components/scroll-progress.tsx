"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const next = total <= 0 ? 0 : window.scrollY / total;
      setProgress(Math.max(0, Math.min(1, next)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="scroll-progress-shell" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
