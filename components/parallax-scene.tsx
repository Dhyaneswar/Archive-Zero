"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxSceneProps {
  image: string;
  alt: string;
  className?: string;
  speed?: number;
  overlay?: ReactNode;
}

export function ParallaxScene({ image, alt, className, speed = 0.12, overlay }: ParallaxSceneProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) {
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      media.style.transform = "translate3d(0, 0, 0) scale(1.04)";
      return;
    }

    let raf = 0;

    const update = () => {
      const rect = frame.getBoundingClientRect();
      const offset = rect.top * -speed;
      media.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      raf = 0;
    };

    const onScroll = () => {
      if (!raf) {
        raf = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, [speed]);

  return (
    <div ref={frameRef} className={`scene-frame ${className ?? ""}`.trim()}>
      <div
        ref={mediaRef}
        className="scene-media"
        role="img"
        aria-label={alt}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="scene-vignette" />
      {overlay}
    </div>
  );
}
