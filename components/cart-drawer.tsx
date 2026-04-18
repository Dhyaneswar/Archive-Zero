"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/site-data";

export function CartDrawer() {
  const { closeDrawer, isDrawerOpen, items, removeItem, setQuantity, subtotal } = useCart();

  return (
    <div className={`cart-drawer-shell ${isDrawerOpen ? "is-open" : ""}`} aria-hidden={!isDrawerOpen}>
      <button type="button" className="cart-backdrop" onClick={closeDrawer} aria-label="Close cart drawer" />
      <aside className="cart-drawer">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-bronze">Cart</p>
            <h2 className="mt-2 font-display text-3xl text-white">Numbered pieces held in reserve</h2>
          </div>
          <button type="button" className="button-secondary !px-4 !py-2 text-xs uppercase tracking-[0.24em]" onClick={closeDrawer}>
            Close
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <div className="glass-panel p-6 text-sm leading-7 text-fog/75">
              Your cart is empty. The archive still feels best when held deliberately.
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.slug}-${item.size}-${item.color}`} className="cart-line">
                <Image src={item.image} alt={item.name} width={96} height={112} className="h-28 w-24 rounded-[1.25rem] object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl text-white">{item.name}</p>
                      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-fog/65">{item.edition}</p>
                    </div>
                    <p className="font-display text-xl text-white">{formatPrice(item.price)}</p>
                  </div>
                  <p className="mt-3 text-sm text-fog/70">
                    {item.color} / {item.size}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="quantity-stepper">
                      <button type="button" onClick={() => setQuantity(item.slug, item.size, item.color, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => setQuantity(item.slug, item.size, item.color, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-[0.65rem] uppercase tracking-[0.28em] text-fog/55"
                      onClick={() => removeItem(item.slug, item.size, item.color)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="glass-panel mt-8 space-y-4 p-6">
          <div className="flex items-center justify-between gap-3 text-sm text-fog/75">
            <span>Subtotal</span>
            <span className="font-display text-2xl text-white">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm text-fog/60">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex gap-3">
            <Link href="/cart" className="button-secondary w-full text-center" onClick={closeDrawer}>
              View Cart
            </Link>
            <button type="button" className="button-primary w-full">
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
