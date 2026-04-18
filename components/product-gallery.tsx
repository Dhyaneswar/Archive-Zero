"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0] ?? "";

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
        <div className="relative h-[36rem] w-full">
          <Image src={activeImage} alt={alt} fill sizes="(min-width: 1280px) 55vw, 100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(8,7,9,0.35)_100%)]" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={`overflow-hidden rounded-[1.4rem] border ${index === activeIndex ? "border-bronze" : "border-white/10"} bg-white/5`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="relative h-28 w-full">
              <Image src={image} alt={`${alt} thumbnail ${index + 1}`} fill sizes="20vw" className="object-cover" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
