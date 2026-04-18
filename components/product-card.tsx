"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/components/cart-context";
import { formatPrice, type Product } from "@/lib/site-data";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card group">
      <Link href={`/shop/${product.slug}`} className="relative block overflow-hidden">
        <div className="product-card-image-layer">
          <Image
            src={product.images.primary}
            alt={product.name}
            fill
            sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 44vw, 92vw"
            className="product-image is-primary"
          />
          <Image
            src={product.images.secondary}
            alt={`${product.name} alternate view`}
            fill
            sizes="(min-width: 1536px) 22vw, (min-width: 1024px) 44vw, 92vw"
            className="product-image is-secondary"
          />
        </div>
        <div className="product-card-overlay" />
        <div className="product-card-copy">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.25em] text-signal/70">
                Drop {String(product.dropNumber).padStart(2, "0")} / {product.dropName}
              </p>
              <h3 className="mt-2 font-display text-2xl text-white uppercase tracking-tight">{product.name}</h3>
            </div>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-fog/50">{product.edition}</span>
          </div>
          <p className="mt-3 max-w-xs text-[0.78rem] leading-6 text-fog/70">{product.description}</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="font-display text-xl text-white">{formatPrice(product.price)}</span>
            <span className={`font-mono text-[0.58rem] uppercase tracking-[0.25em] ${product.status === "current" ? "text-signal" : product.status === "archived" ? "text-terminal" : "text-fog/40"}`}>
              {product.status === "current" ? "// Active" : product.status === "archived" ? "// Archived" : "// Locked"}
            </span>
          </div>
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-between gap-3">
        <Link href={`/shop/${product.slug}`} className="button-secondary">
          View Piece
        </Link>
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
              size: product.sizes[2] ?? product.sizes[0] ?? "M",
              color: product.palette[0] ?? "Archive Tone",
              quantity: 1
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
