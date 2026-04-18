import { MotionSection } from "@/components/motion-section";
import { ParallaxScene } from "@/components/parallax-scene";
import { ShopGrid } from "@/components/shop-grid";
import { heroScenes, products } from "@/lib/site-data";

export const metadata = {
  title: "Current Drop"
};

export default function ShopPage() {
  return (
    <div className="space-y-8 md:space-y-14">
      <ParallaxScene
        image="/images/pexels-zkadoshi-36085970.jpg"
        alt="Current Drop scene"
        className="min-h-[36rem]"
        overlay={
          <div className="relative z-10 flex h-full items-end p-6 md:p-10 lg:p-14">
            <div className="hud-panel max-w-3xl p-6 md:p-8">
              <p className="editorial-kicker">// Acquisition Floor / Active Drop</p>
              <h1 className="hero-heading mt-4 !text-[clamp(2.8rem,7vw,5.4rem)]">Drop 0, Prologue.</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-fog/70">
                Minimal, weighted, and unfinished on purpose. The archive begins in muted tones, calm force, and collectible
                precision.
              </p>
            </div>
          </div>
        }
      />

      <MotionSection className="page-section" delayMs={60}>
        <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="hud-panel p-7">
            <p className="editorial-kicker">// Specimen Gallery</p>
            <h2 className="editorial-heading mt-3">A luxury acquisition floor with more atmosphere than retail noise.</h2>
          </div>
          <div className="hud-panel p-7">
            <p className="text-sm leading-7 text-fog/70">
              Hover states crossfade into alternate garment views, the imagery stays oversized and filmic, and every card
              carries edition language instead of discount language.
            </p>
          </div>
        </div>
        <ShopGrid products={products} />
      </MotionSection>

      <MotionSection className="page-section" delayMs={120}>
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <ParallaxScene image={heroScenes.craft} alt="Craft scene" className="min-h-[28rem]" />
          <div className="hud-panel p-7 md:p-9">
            <p className="editorial-kicker">// Material Intel</p>
            <h2 className="editorial-heading mt-4">Substantial garments, not throwaway merch.</h2>
            <div className="mt-6 space-y-3 text-sm leading-7 text-fog/70">
              <p>450 GSM fleece, edition-numbered labels, documented archive entries, and no restock policy.</p>
              <p>Every piece is made to feel weighty in hand, calm on body, and rare in memory.</p>
            </div>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
