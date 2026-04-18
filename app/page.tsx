import Link from "next/link";

import { ArchiveCard } from "@/components/archive-card";
import { MotionSection } from "@/components/motion-section";
import { ParallaxScene } from "@/components/parallax-scene";
import { ProductCard } from "@/components/product-card";
import { WaitlistForm } from "@/components/waitlist-form";
import { drops, heroScenes, manifestoQuotes, products } from "@/lib/site-data";

const currentProduct = products[0]!;

export default function HomePage() {
  return (
    <div className="space-y-8 md:space-y-14">
      {/* === HERO === */}
      <ParallaxScene
        image={heroScenes.home}
        alt="Archive Zero hero campaign"
        className="min-h-[44rem]"
        overlay={
          <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-10 lg:p-14">
            <div className="flex items-start justify-between gap-6">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-signal/70 border border-signal/30 px-3 py-2">
                // Mission Active / Drop 00
              </div>
              <div className="text-right">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-fog/40">Edition</p>
                <p className="font-mono text-xl text-bone mt-1">017 <span className="text-fog/30">/ 500</span></p>
              </div>
            </div>

            <div className="max-w-[56rem]">
              <p className="editorial-kicker">Archive Zero // Finite Emotion Archive</p>
              <h1 className="hero-heading mt-5">Wear what words cannot hold.</h1>
              <p className="editorial-copy mt-6 max-w-2xl">
                Ten drops. One emotional sequence. Every piece numbered, every release intentional. 
                The last chapter is The Unknown. The archive ends by design.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/shop" className="button-primary">
                  Enter Current Drop ›››
                </Link>
                <Link href="/archive" className="button-secondary">
                  View Full Archive
                </Link>
              </div>
            </div>
          </div>
        }
      />

      {/* === MISSION BRIEFING === */}
      <MotionSection className="page-section">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hud-panel p-7 md:p-9">
            <p className="editorial-kicker">// Mission Briefing</p>
            <h2 className="editorial-heading mt-4">Not a store. A finite identity project told through cloth, movement, and numbered memory.</h2>
          </div>
          <div className="hud-panel p-7 md:p-9">
            <p className="editorial-copy">
              Each drop represents an emotion or human state. Every piece is held inside a strict cap of 500. 
              When the final drop arrives, the brand ends intentionally. 
              Nothing is mass made. Everything is meant.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-signal/60">
              <span>450 GSM fleece</span>
              <span className="text-fog/20">|</span>
              <span>500 pieces per drop</span>
              <span className="text-fog/20">|</span>
              <span>10 drops total</span>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* === FREEDOM SCENE === */}
      <MotionSection className="page-section">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <ParallaxScene
            image={heroScenes.freedom}
            alt="Flowing Archive Zero campaign scene"
            overlay={
              <div className="relative z-10 flex h-full items-end p-6 md:p-10">
                <div className="hud-panel max-w-xl p-6 md:p-8">
                  <p className="editorial-kicker">// Signal: Freedom</p>
                  <h2 className="mt-3 font-display text-3xl text-white md:text-4xl uppercase tracking-tight">
                    Spaciousness, wind, horizon, and the calm confidence of moving without explanation.
                  </h2>
                </div>
              </div>
            }
          />

          <div className="grid gap-6">
            <div className="hud-panel p-7">
              <p className="editorial-kicker">// Current Drop</p>
              <h2 className="mt-3 font-display text-3xl text-white md:text-4xl uppercase tracking-tight">
                {currentProduct.dropName} begins in softness, unfinished edges, and weighted silence.
              </h2>
              <p className="mt-4 text-sm leading-7 text-fog/70">{currentProduct.story}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="hud-panel p-6">
                <p className="editorial-kicker">// Craft</p>
                <p className="mt-3 text-[0.78rem] leading-6 text-fog/70">
                  Heavyweight cotton fleece, sculptural drape, brushed interiors, and a tactile hand-feel that makes every
                  piece land as an object.
                </p>
              </div>
              <div className="hud-panel p-6">
                <p className="editorial-kicker">// Scarcity Protocol</p>
                <p className="mt-3 text-[0.78rem] leading-6 text-fog/70">
                  Each garment is editioned. Once sold through, it stays in the archive forever. The arc matters more than scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* === FEATURED SPECIMEN === */}
      <MotionSection className="page-section">
        <div className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
          <div className="hud-panel p-7 md:p-9">
            <p className="editorial-kicker">// Featured Specimen</p>
            <h2 className="editorial-heading mt-4">A numbered garment held like a collectible artifact.</h2>
            <p className="mt-4 text-sm leading-7 text-fog/70">
              The site feels less like a store grid and more like a moving archive of scenes, details, and emotional
              states. The current drop anchors that world.
            </p>
          </div>
          <ProductCard product={currentProduct} />
        </div>
      </MotionSection>

      {/* === DROP TIMELINE WITH HOVER POPUPS === */}
      <MotionSection className="page-section">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="editorial-kicker">// Emotional Arc / Timeline</p>
            <h2 className="editorial-heading mt-3">Ten chapters only, moving toward The Unknown.</h2>
          </div>
          <Link href="/archive" className="button-secondary">
            Explore Timeline ›››
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 py-10">
          {drops.slice(0, 4).map((drop) => (
            <ArchiveCard key={drop.number} drop={drop} />
          ))}
        </div>
      </MotionSection>

      {/* === MANIFESTO PREVIEW === */}
      <MotionSection className="page-section">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="hud-panel p-7 md:p-9">
            <p className="editorial-kicker">// Manifesto // Classified</p>
            <h2 className="editorial-heading mt-4">{manifestoQuotes[0]}</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-fog/70">
              Identity before category. Intention before volume. Archive Zero exists because luxury can feel more emotional,
              more spacious, and more final when it is allowed to end.
            </p>
            <Link href="/manifesto" className="button-primary mt-8">
              Read the Manifesto ›››
            </Link>
          </div>
          <ParallaxScene image={heroScenes.archive} alt="Archive Zero portrait scene" className="min-h-[30rem]" />
        </div>
      </MotionSection>

      {/* === WAITLIST === */}
      <MotionSection className="page-section">
        <WaitlistForm />
      </MotionSection>
    </div>
  );
}
