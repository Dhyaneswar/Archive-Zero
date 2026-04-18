"use client";

import { useState } from "react";

import { useCart } from "@/components/cart-context";
import { formatPrice, type Product } from "@/lib/site-data";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[2] ?? product.sizes[0] ?? "M");
  const [color, setColor] = useState(product.palette[0] ?? "Archive Tone");
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="hud-panel space-y-6 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="editorial-kicker">
              // Drop {String(product.dropNumber).padStart(2, "0")} / {product.dropName}
            </p>
            <h1 className="mt-3 font-display text-4xl text-white md:text-5xl uppercase tracking-tight">{product.name}</h1>
            <p className="mt-3 text-sm leading-7 text-fog/70">{product.description}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display text-3xl text-white">{formatPrice(product.price)}</p>
            <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-fog/50">{product.edition}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-fog/50">Size</span>
            <select className="lux-select" value={size} onChange={(event) => setSize(event.target.value)}>
              {product.sizes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-fog/50">Color</span>
            <select className="lux-select" value={color} onChange={(event) => setColor(event.target.value)}>
              {product.palette.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="quantity-stepper">
            <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((current) => current + 1)}>
              +
            </button>
          </div>

          <div className="flex flex-1 flex-wrap gap-3 justify-end">
            <button
              type="button"
              className="button-primary"
              onClick={() =>
                addItem({
                  slug: product.slug,
                  name: product.name,
                  edition: product.edition,
                  price: product.price,
                  image: product.images.primary,
                  size,
                  color,
                  quantity
                })
              }
            >
              Acquire Artifact ›››
            </button>
            <button type="button" className="button-secondary">
              Buy Now
            </button>
          </div>
        </div>

        <div className="border border-signal/20 bg-signal/5 p-4 text-[0.78rem] leading-6 text-fog/70 font-mono" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
          {product.scarcityNote}
        </div>
      </div>

      <div className="fixed inset-x-4 bottom-4 z-30 border border-signal/30 bg-[rgba(10,10,10,0.95)] p-3 backdrop-blur-xl md:hidden" style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
        <button
          type="button"
          className="button-primary w-full"
          onClick={() =>
            addItem({
              slug: product.slug,
              name: product.name,
              edition: product.edition,
              price: product.price,
              image: product.images.primary,
              size,
              color,
              quantity
            })
          }
        >
          Acquire // {formatPrice(product.price)}
        </button>
      </div>
    </>
  );
}
