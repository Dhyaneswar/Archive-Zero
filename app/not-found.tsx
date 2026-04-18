import Link from "next/link";

import { MotionSection } from "@/components/motion-section";
import { ParallaxScene } from "@/components/parallax-scene";

export default function NotFound() {
  return (
    <MotionSection className="page-section">
      <ParallaxScene
        image="/images/pexels-atahandemir-10848147.jpg"
        alt="Archive Zero not found scene"
        className="min-h-[40rem]"
        overlay={
          <div className="relative z-10 flex h-full items-end p-6 md:p-10 lg:p-14">
            <div className="glass-panel max-w-3xl rounded-[2rem] p-6 md:p-8">
              <p className="editorial-kicker">404 / unreleased</p>
              <h1 className="hero-heading mt-4 !text-[clamp(3rem,6vw,5.4rem)]">This page was never released.</h1>
              <p className="mt-5 text-base leading-8 text-fog/78">
                Not every chapter becomes visible. Return to the current drop or move through the archive instead.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/" className="button-primary">
                  Return Home
                </Link>
                <Link href="/archive" className="button-secondary">
                  Open Archive
                </Link>
              </div>
            </div>
          </div>
        }
      />
    </MotionSection>
  );
}
