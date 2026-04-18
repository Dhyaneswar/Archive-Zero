"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParallaxScene } from "./parallax-scene";

export function ZAxisGallery({ scenes }: { scenes: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll height proportional to the number of scenes so the speed is constant
  const scrollHeight = `${scenes.length * 150}vh`;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: scrollHeight }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Optic targeting reticle that stays in the center */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="w-[40vw] h-[40vw] max-w-lg max-h-lg border border-white/5 rounded-full animate-spin-slow"></div>
          <div className="absolute w-[30vw] h-[30vw] max-w-md max-h-md border border-signal/10 rounded-full animate-reverse-spin"></div>
        </div>

        {scenes.map((scene, index) => {
          // Calculate when this specific scene should fly past the camera
          const start = index / scenes.length;
          const end = (index + 1) / scenes.length;
          
          // Scale from far away (0.1) to flying past the camera (5)
          const scale = useTransform(scrollYProgress, [start, end], [0.1, 4]);
          
          // Fade in early, stay solid, then fade out right as it passes the camera
          const opacity = useTransform(
            scrollYProgress, 
            [start, start + 0.1, end - 0.1, end], 
            [0, 1, 1, 0]
          );
          
          const zIndex = index + 1;

          return (
            <motion.div 
              key={scene.title}
              className="absolute inset-0 flex items-center justify-center w-full h-full will-change-transform"
              style={{ scale, opacity, zIndex }}
            >
              {/* Extreme Hexagon Shard Mask */}
              <div className="w-[90vw] max-w-6xl aspect-[16/10] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] opacity-95">
                <ParallaxScene
                  image={scene.image}
                  alt={scene.title}
                  className="h-full w-full"
                  overlay={
                    <>
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 pointer-events-none" />
                      <div className="relative z-10 flex h-full items-end p-8 md:p-16 lg:p-24">
                        <div className="max-w-3xl border-l-2 border-signal pl-8 md:pl-10">
                          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-signal drop-shadow-[0_0_8px_rgba(255,77,0,0.8)]">
                            // {scene.eyebrow}
                          </p>
                          <h2 className="mt-4 font-display text-4xl lg:text-6xl text-white">
                            {scene.title}
                          </h2>
                          <p className="mt-4 text-sm md:text-base leading-8 text-fog/90">
                            {scene.caption}
                          </p>
                        </div>
                      </div>
                    </>
                  }
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
