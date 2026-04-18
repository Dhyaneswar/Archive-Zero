"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    const id = window.requestAnimationFrame(() => {
      setReady(true);
    });

    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return <div className={`page-transition ${ready ? "is-ready" : ""}`}>{children}</div>;
}
