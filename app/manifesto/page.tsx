import { MotionSection } from "@/components/motion-section";
import { ParallaxScene } from "@/components/parallax-scene";
import { OpticDecryptionCore } from "@/components/optic-decryption";
import { manifestoQuotes } from "@/lib/site-data";

export const metadata = {
  title: "Manifesto"
};

export default function ManifestoPage() {
  return (
    <div className="space-y-8 md:space-y-14">
      <MotionSection className="page-section">
        <OpticDecryptionCore>
          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="border-l border-white/20 pl-7 md:pl-9 py-2 relative before:absolute before:left-0 before:top-0 before:w-4 before:h-[1px] before:bg-signal after:absolute after:left-0 after:bottom-0 after:w-4 after:h-[1px] after:bg-white/20">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">// Manifesto // Classified Document</p>
              <h1 className="hero-heading mt-4 !text-[clamp(2.6rem,5.5vw,5rem)]">{manifestoQuotes[0]}</h1>
              <p className="mt-6 text-sm leading-7 text-fog/90">
                Archive Zero exists because clothing can hold emotional meaning with more dignity than trend cycles allow. It
                exists because self-definition should feel precise, rare, and spacious.
              </p>
            </div>
            <div className="[clip-path:polygon(0_0,100%_0,100%_calc(100%-40px),calc(100%-40px)_100%,0_100%)]">
              <ParallaxScene
                image="/images/pexels-psrvsky-pi-54155085-30005323.jpg"
                alt="Manifesto portrait"
                className="min-h-[34rem]"
              />
            </div>
          </div>
        </OpticDecryptionCore>
      </MotionSection>

      <MotionSection className="page-section">
        <OpticDecryptionCore>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="border-t border-signal/30 pt-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">// Why Emotion</p>
              <p className="mt-4 text-sm leading-7 text-fog/90">
                Emotion gives each drop a reason to exist beyond seasonal product rotation. A chapter feels more lasting when it
                names a human state instead of a trend.
              </p>
            </div>
            <div className="border-t border-signal/30 pt-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">// Why Scarcity</p>
              <p className="mt-4 text-sm leading-7 text-fog/90">
                Scarcity forces intention. Fewer pieces mean clearer memory, stronger ownership, and a more coherent archive.
              </p>
            </div>
            <div className="border-t border-signal/30 pt-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">// Why Numbering</p>
              <p className="mt-4 text-sm leading-7 text-fog/90">
                Numbering turns each garment into a documented object. It shifts the relationship from consumption toward
                collection.
              </p>
            </div>
          </div>
        </OpticDecryptionCore>
      </MotionSection>

      <MotionSection className="page-section">
        <OpticDecryptionCore>
          <div className="border-l-2 border-signal/50 pl-6 md:pl-10">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">// Classified Essay</p>
            <div className="mt-6 grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
              <div>
                <h2 className="editorial-heading">The archive ends because the last gesture should still mean something.</h2>
              </div>
              <div className="space-y-5 text-sm leading-7 text-fog/90">
                <p>
                  Most brands are designed to continue indefinitely, even after the idea has already been diluted. Archive Zero
                  rejects that logic. It is built around ten intentional drops only. That limit is not a constraint on ambition.
                  It is the proof that the concept knows where it ends.
                </p>
                <p>
                  The slogan is simple: you are who you define yourself to be. The garments do not define the wearer. They
                  accompany the wearer through emotional states and leave behind an exact record of that passage.
                </p>
                <p>
                  Freedom, here, is not escape. It is spaciousness. It is open air, moving fabric, stillness, and the quiet
                  power of choosing what part of yourself is made visible.
                </p>
              </div>
            </div>
          </div>
        </OpticDecryptionCore>
      </MotionSection>
    </div>
  );
}
