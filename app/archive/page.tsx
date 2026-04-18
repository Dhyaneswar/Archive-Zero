import Link from "next/link";

import { ArchiveCard } from "@/components/archive-card";
import { MotionSection } from "@/components/motion-section";
import { ParallaxScene } from "@/components/parallax-scene";
import { drops, heroScenes } from "@/lib/site-data";

export const metadata = {
  title: "Archive"
};

export default function ArchivePage() {
  const releasedCount = drops.filter(d => d.status === "released" || d.status === "current").length;

  return (
    <div className="space-y-8 md:space-y-14">
      <ParallaxScene
        image={heroScenes.archive}
        alt="Archive Zero portrait hero"
        className="min-h-[34rem]"
        overlay={
          <div className="relative z-10 flex h-full items-end p-6 md:p-10 lg:p-14">
            <div className="hud-panel max-w-4xl p-6 md:p-8">
              <p className="editorial-kicker">// Archive // Full Timeline</p>
              <h1 className="hero-heading mt-4 !text-[clamp(2.6rem,6vw,5rem)]">
                Prologue to The Unknown, one complete emotional arc.
              </h1>
            </div>
          </div>
        }
      />

      {/* === PROGRESS INDICATOR === */}
      <MotionSection className="page-section">
        <div className="hud-panel p-7 md:p-9">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="editorial-kicker">// Arc Progress</p>
              <h2 className="editorial-heading mt-3">Mission status: {releasedCount} of 10 drops deployed.</h2>
            </div>
            <div className="flex-shrink-0">
              <div className="w-64 h-2 bg-white/5 overflow-hidden" style={{ clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))" }}>
                <div
                  className="h-full bg-signal shadow-[0_0_12px_rgba(255,77,0,0.5)]"
                  style={{ width: `${(releasedCount / 10) * 100}%` }}
                />
              </div>
              <p className="font-mono text-[0.58rem] text-fog/40 mt-2 tracking-wider">
                {10 - releasedCount} drops remaining until THE UNKNOWN
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-fog/50">
            {drops.map((drop) => (
              <span key={drop.number} className={drop.status === "current" ? "text-signal" : drop.status === "released" ? "text-terminal/60" : ""}>
                {String(drop.number).padStart(2, "0")} / {drop.name}
              </span>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* === DROP ARC WITH HOVER POPUPS === */}
      <MotionSection className="page-section">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-16">
          {drops.map((drop) => (
            <ArchiveCard key={drop.number} drop={drop} />
          ))}
        </div>
      </MotionSection>

      {/* === CLOSING === */}
      <MotionSection className="page-section">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="hud-panel p-7 md:p-9">
            <p className="editorial-kicker">// End Protocol</p>
            <h2 className="editorial-heading mt-4">Archive Zero becomes more rare because it intends to stop.</h2>
            <p className="mt-5 text-sm leading-7 text-fog/70">
              After the tenth drop, the house ends intentionally. The archive remains finite by design, not because it failed
              to scale.
            </p>
            <Link href="/manifesto" className="button-primary mt-8">
              Read Why It Ends ›››
            </Link>
          </div>
          <ParallaxScene
            image="/images/pexels-jsantiagoph-33557391.jpg"
            alt="The Unknown campaign scene"
            className="min-h-[30rem]"
          />
        </div>
      </MotionSection>
    </div>
  );
}
