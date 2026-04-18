"use client";

import { useRef, useState, useEffect } from "react";

export function OpticDecryptionCore({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    
    const node = containerRef.current;
    if (node) {
      node.addEventListener("mousemove", handleMouseMove);
      node.addEventListener("mouseenter", () => setIsHovering(true));
      node.addEventListener("mouseleave", () => setIsHovering(false));
    }
    
    return () => {
      if (node) {
        node.removeEventListener("mousemove", handleMouseMove);
        node.removeEventListener("mouseenter", () => setIsHovering(true));
        node.removeEventListener("mouseleave", () => setIsHovering(false));
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full group cursor-crosshair">
      {/* Base Layer: Redacted / Blurred / Low Opacity */}
      <div className="w-full opacity-40 blur-[6px] grayscale transition-all duration-700 select-none">
        {children}
      </div>
      
      {/* Decrypted Reveal Layer */}
      <div 
        className="absolute inset-0 w-full pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          WebkitMaskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
          maskImage: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
        }}
      >
        <div className="text-signal drop-shadow-[0_0_15px_rgba(255,77,0,0.8)] brightness-150 saturate-200">
            {children}
        </div>
      </div>
      
      {/* Hover prompt (fades out when interacting) */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-signal/50 pointer-events-none transition-opacity duration-500 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
        [ INITIATE OPTIC DECRYPT ]
      </div>
    </div>
  );
}
