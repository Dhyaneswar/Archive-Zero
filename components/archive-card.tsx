"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { products, heroScenes } from "@/lib/site-data";
import type { Drop } from "@/lib/site-data";

interface ArchiveCardProps {
  drop: Drop;
}

const HERO_IMAGES = Object.values(heroScenes);

function HudDataNode({ number, status }: { number: number; status: string }) {
  const color = status === "current" ? "#ff4d00" : status === "released" ? "#4ade80" : "rgba(255,255,255,0.4)";
  
  // Map specific drop numbers to their corresponding provided emotion logos
  const logoFiles = [
    "prolougue.png",
    "longing.png",
    "rage.png",
    "revenge.png",
    "grief.png",
    "silence.png",
    "clarity.png",
    "peace.png",
    "rebirth.png",
    "unknown.png"
  ];
  const backgroundImage = `/images/logo_pics/${logoFiles[number % logoFiles.length]}`;

  // Distinct clip-path geometries based on node
  const geometries = [
    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hexagon
    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // Diamond
    "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)", // Parallelogram
    "polygon(10% 0, 100% 0, 90% 100%, 0 100%)", // Slanted rectangle
    "polygon(50% 0%, 100% 100%, 0% 100%)", // Triangle
    "polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%)", // Cross
    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)", // Octagon
    "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)", // Chamfered corner
    "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)", // Decagon
    "circle(50% at 50% 50%)" // Orb
  ];

  const clipPath = geometries[number % geometries.length];

  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
      {/* Outer rotating technical ring */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
        <circle 
          cx="50" cy="50" r="48" 
          fill="none" 
          stroke={color} 
          strokeWidth="1" 
          strokeDasharray="4 8" 
          opacity="0.6" 
        />
        <circle 
          cx="50" cy="50" r="42" 
          fill="none" 
          stroke={color} 
          strokeWidth="0.5" 
          strokeDasharray="1 4" 
          opacity="0.3" 
        />
      </svg>

      {/* Counter-rotating inner tracker */}
      <svg className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] animate-[spin_15s_linear_infinite_reverse]" viewBox="0 0 100 100">
        <path d="M50 5 L50 15 M50 95 L50 85 M5 50 L15 50 M95 50 L85 50" stroke={color} strokeWidth="2" opacity="0.8" />
      </svg>

      {/* Core Image Glass Shard */}
      <div 
        className="w-12 h-12 md:w-16 md:h-16 relative overflow-hidden transition-all duration-700 group-hover:scale-110"
        style={{ clipPath }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-700 group-hover:scale-[1.35] saturate-50 mix-blend-luminosity"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Color overlay to tint the image to the status context */}
        <div className="absolute inset-0 mix-blend-color opacity-80" style={{ backgroundColor: color }} />
        {/* Scanline overlay for tactical feel */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-40 mix-blend-overlay"></div>
      </div>
    </div>
  );
}

export function ArchiveCard({ drop }: ArchiveCardProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [popupState, setPopupState] = useState({
    visible: false,
    x: 0,
    y: 0
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = () => {
    if (!nodeRef.current) return;
    
    const rect = nodeRef.current.getBoundingClientRect();
    const POPUP_W = 420; // Max expected width
    const POPUP_H = 340; // Max expected height
    
    // 1. Calculate ideal X (Prefer right side of node)
    let x = rect.right + 24;
    // Bounds check X: if it bleeds right, cast it to the left side
    if (x + POPUP_W > window.innerWidth) {
      x = Math.max(16, rect.left - POPUP_W - 24);
    }

    // 2. Calculate ideal Y (Center vertically relative to the node)
    let y = rect.top + (rect.height / 2) - (POPUP_H / 2);
    // Bounds check Y: prevent clipping at top or bottom
    if (y < 24) y = 24;
    if (y + POPUP_H > window.innerHeight - 24) y = window.innerHeight - POPUP_H - 24;

    setPopupState({ visible: true, x, y });
  };

  const handleMouseLeave = () => {
    setPopupState(prev => ({ ...prev, visible: false }));
  };

  const statusColor = drop.status === "current" ? "text-signal" : drop.status === "released" ? "text-terminal" : "text-fog/40";
  const statusLabel = drop.status === "current" ? "// ACTIVE" : drop.status === "released" ? "// ARCHIVED" : "// LOCKED";

  const popupContent = (
    <div
      className={`drop-popup transition-all duration-300 ${
        popupState.visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
      }`}
      style={{
        position: 'fixed',
        left: `${popupState.x}px`,
        top: `${popupState.y}px`,
        zIndex: 9999
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-signal">
          // Drop {String(drop.number).padStart(2, "0")} Intel
        </span>
        <span className={`font-mono text-[0.58rem] uppercase tracking-[0.2em] ${statusColor}`}>
          {statusLabel}
        </span>
      </div>

      <h3 className="font-display text-3xl text-bone mb-1">{drop.name}</h3>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal/70 mb-4">
        Emotion: {drop.emotion}
      </p>

      <p className="text-sm leading-7 text-fog/80 mb-5">
        {drop.popupDescription}
      </p>

      <div className="border-t border-signal/20 pt-4 flex items-center justify-between">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-fog/40">
          Palette: {drop.palette}
        </span>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-fog/40">
          500 units
        </span>
      </div>
    </div>
  );

  return (
    <>
      <div 
        ref={nodeRef}
        className="group flex flex-col items-center justify-center p-4 cursor-crosshair isolate"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <HudDataNode number={drop.number} status={drop.status} />
        
        {/* Permanent label beneath the complex shape */}
        <div className="mt-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-fog/90 whitespace-nowrap">
            {drop.number.toString().padStart(2, "0")} / {drop.name}
          </p>
        </div>
      </div>

      {/* Render the popup in a Portal mounted directly to body so it escapes all parent transforms and overflow bounds */}
      {mounted && createPortal(popupContent, document.body)}
    </>
  );
}
