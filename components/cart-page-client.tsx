"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/components/cart-context";
import { formatPrice } from "@/lib/site-data";

export function CartPageClient() {
  const { clear, items, removeItem, setQuantity, subtotal } = useCart();

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
      <section className="space-y-4">
        {items.length === 0 ? (
          <div className="glass-panel rounded-[2rem] p-8">
            <h2 className="font-display text-4xl text-white">Nothing held yet.</h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-fog/78">
              The cart is empty. Return to the current drop when you are ready to hold a numbered piece.
            </p>
            <Link href="/shop" className="button-primary mt-6">
              Enter Current Drop
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <article key={`${item.slug}-${item.size}-${item.color}`} className="glass-panel rounded-[2rem] p-5 md:p-6">
              <div className="flex flex-col gap-5 md:flex-row">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={192}
                  height={240}
                  className="h-60 w-full rounded-[1.5rem] object-cover md:w-48"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl text-white">{item.name}</h3>
                      <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-fog/65">{item.edition}</p>
                    </div>
                    <p className="font-display text-3xl text-white">{formatPrice(item.price)}</p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-fog/78">
                    {item.color} / {item.size}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
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
                      className="text-[0.7rem] uppercase tracking-[0.26em] text-fog/60"
                      onClick={() => removeItem(item.slug, item.size, item.color)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      <aside className="glass-panel h-fit rounded-[2rem] p-7">
        <p className="editorial-kicker">Order summary</p>
        <h2 className="mt-3 font-display text-4xl text-white">Held with intent.</h2>
        <div className="mt-8 space-y-4 text-sm text-fog/76">
          <div className="flex items-center justify-between gap-4">
            <span>Subtotal</span>
            <span className="font-display text-2xl text-white">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Shipping</span>
            <span>Calculated later</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Promo code</span>
            <span>Placeholder</span>
          </div>
        </div>
        <button type="button" className="button-primary mt-8 w-full">
          Continue to Checkout
        </button>
        <button type="button" className="button-secondary mt-3 w-full" onClick={clear}>
          Clear Cart
        </button>
      </aside>
    </div>
  );
}
