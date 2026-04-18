import { ContactForm } from "@/components/contact-form";
import { MotionSection } from "@/components/motion-section";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <div className="space-y-10 md:space-y-16">
      <MotionSection className="page-section">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="border-l border-white/20 pl-7 md:pl-9 py-2 relative before:absolute before:left-0 before:top-0 before:w-4 before:h-[1px] before:bg-signal after:absolute after:left-0 after:bottom-0 after:w-4 after:h-[1px] after:bg-white/20">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-signal">// Contact / Waitlist</p>
            <h1 className="editorial-heading mt-4">Exclusive, quiet, and close to the archive.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-fog/90 border-l-[1px] border-signal/40 pl-4">
              Join the waitlist, send an inquiry, or request access to future chapters before they open publicly.
            </p>
            <div className="mt-8 flex flex-col gap-4 text-[0.65rem] uppercase tracking-[0.2em] text-fog/90">
              <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-signal"></span>Instagram / @archivezero</span>
              <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-signal"></span>Press / press@archivezero.example</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </MotionSection>

      <MotionSection className="page-section">
        <WaitlistForm />
      </MotionSection>
    </div>
  );
}
