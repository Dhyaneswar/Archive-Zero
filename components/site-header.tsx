"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navItems } from "@/lib/site-data";
import { useCart } from "@/components/cart-context";

export function SiteHeader() {
  const pathname = usePathname();
  const { count, openDrawer } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-rail" aria-hidden="true">
        <span className="header-rail-focus" />
        <span className="header-rail-hit" />
      </div>

      <Link href="/" className="site-brand">
        <span className="site-brand-mark">
          Archive <span className="text-signal">Zero</span>
        </span>
        <span className="site-brand-meta">
          Finite Emotion Archive
        </span>
      </Link>

      <nav className="site-nav desktop-nav">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={pathname === item.href ? "nav-link is-active" : "nav-link"}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <button type="button" className="header-cart-link" onClick={openDrawer}>
          Cart <span>// {String(count).padStart(2, "0")}</span>
        </button>
        <button
          type="button"
          className="mobile-menu-button"
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-panel ${menuOpen ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? "nav-link is-active" : "nav-link"}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
