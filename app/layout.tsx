import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-context";
import { CursorAura } from "@/components/cursor-aura";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://archive-zero.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Archive Zero",
    template: "%s | Archive Zero"
  },
  description:
    "Archive Zero is a finite luxury fashion archive built around identity, rarity, emotional storytelling, and numbered scarcity."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <CursorAura />
          <ScrollProgress />
          <div className="cinematic-void" />
          <div className="background-noise" />
          <div className="background-grid" />
          <div className="background-glow background-glow-left" />
          <div className="background-glow background-glow-right" />
          <div className="page-shell">
            <SiteHeader />
            <main className="page-main">{children}</main>
            <SiteFooter />
          </div>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
