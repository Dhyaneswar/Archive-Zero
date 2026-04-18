import Link from "next/link";
import { footerLinks, drops } from "@/lib/site-data";

export function SiteFooter() {
  const releasedCount = drops.filter(d => d.status === "released" || d.status === "current").length;

  return (
    <footer className="site-footer">
      <div className="space-y-4">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-signal">
          // Archive Status: {releasedCount} of 10 missions complete
        </p>
        <p className="font-display text-xl uppercase tracking-tight text-bone/60">
          You are who you define yourself to be.
        </p>
        <p className="text-[0.65rem] font-mono text-fog/30 tracking-wider">
          Archive Zero is finite by design. Ten drops. Then silence.
        </p>
      </div>
      <div className="flex flex-wrap gap-5">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
