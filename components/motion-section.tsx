"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function MotionSection({ children, className, delayMs = 0 }: MotionSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${className ?? ""} reveal-section ${visible ? "is-visible" : ""}`.trim()}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </section>
  );
}
