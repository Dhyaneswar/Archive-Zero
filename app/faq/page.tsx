import Link from "next/link";

import { FaqAccordion } from "@/components/faq-accordion";
import { MotionSection } from "@/components/motion-section";
import { faqItems } from "@/lib/site-data";

export const metadata = {
  title: "FAQ"
};

export default function FaqPage() {
  return (
    <div className="space-y-10 md:space-y-16">
      <MotionSection className="page-section">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="border-l border-white/20 pl-7 md:pl-9 py-2 relative before:absolute before:left-0 before:top-0 before:w-4 before:h-[1px] before:bg-signal after:absolute after:left-0 after:bottom-0 after:w-4 after:h-[1px] after:bg-white/20">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">// Frequently Asked Questions</p>
            <h1 className="editorial-heading mt-4">Clear answers, still held with restraint.</h1>
            <p className="mt-5 text-sm leading-8 text-fog/90">
              Limited drops, numbering, sizing, archive policy, and the final ending of the house all explained without
              generic ecommerce filler.
            </p>
          </div>
          <div className="border-t border-signal/30 pt-8 mt-4 xl:mt-0">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">// Status Unresolved?</p>
            <p className="mt-4 text-sm leading-8 text-fog/90">
              Contact the archive directly for press, shipping, or release-specific questions.
            </p>
            <Link href="/contact" className="inline-block border border-signal text-signal px-6 py-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] hover:bg-signal hover:text-black transition-colors mt-8">
              Initiate Contact
            </Link>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="page-section">
        <FaqAccordion items={faqItems} />
      </MotionSection>
    </div>
  );
}
