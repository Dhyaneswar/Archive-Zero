"use client";

import { useDeferredValue, useMemo, useState } from "react";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/site-data";

type SortMode = "edition" | "price-asc" | "price-desc";

export function ShopGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [size, setSize] = useState("all");
  const [color, setColor] = useState("all");
  const [sort, setSort] = useState<SortMode>("edition");

  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((product) => product.category))],
    [products]
  );
  const statuses = useMemo(
    () => ["all", ...new Set(products.map((product) => product.status))],
    [products]
  );
  const sizes = useMemo(() => ["all", ...new Set(products.flatMap((product) => product.sizes))], [products]);
  const colors = useMemo(() => ["all", ...new Set(products.flatMap((product) => product.palette))], [products]);

  const filteredProducts = useMemo(() => {
    const lowered = deferredQuery.trim().toLowerCase();

    return products
      .filter((product) => (category === "all" ? true : product.category === category))
      .filter((product) => (status === "all" ? true : product.status === status))
      .filter((product) => (size === "all" ? true : product.sizes.includes(size)))
      .filter((product) => (color === "all" ? true : product.palette.includes(color)))
      .filter((product) =>
        lowered.length === 0
          ? true
          : `${product.name} ${product.dropName} ${product.emotion}`.toLowerCase().includes(lowered)
      )
      .sort((left, right) => {
        if (sort === "price-asc") {
          return left.price - right.price;
        }
        if (sort === "price-desc") {
          return right.price - left.price;
        }
        return left.dropNumber - right.dropNumber;
      });
  }, [category, color, deferredQuery, products, size, sort, status]);

  return (
    <div className="space-y-6">
      <div className="hud-panel grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-6">
        <input
          className="lux-input xl:col-span-2"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="// Search by product or emotion"
          aria-label="Search products"
        />
        <select className="lux-select" value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((option) => (
            <option key={option} value={option}>
              Category / {option}
            </option>
          ))}
        </select>
        <select className="lux-select" value={status} onChange={(event) => setStatus(event.target.value)}>
          {statuses.map((option) => (
            <option key={option} value={option}>
              Status / {option}
            </option>
          ))}
        </select>
        <select className="lux-select" value={size} onChange={(event) => setSize(event.target.value)}>
          {sizes.map((option) => (
            <option key={option} value={option}>
              Size / {option}
            </option>
          ))}
        </select>
        <select className="lux-select" value={color} onChange={(event) => setColor(event.target.value)}>
          {colors.map((option) => (
            <option key={option} value={option}>
              Color / {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-signal/60">
          {filteredProducts.length} specimens visible
        </p>
        <select className="lux-select !w-auto min-w-52" value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
          <option value="edition">Sort / Timeline order</option>
          <option value="price-asc">Sort / Price low → high</option>
          <option value="price-desc">Sort / Price high → low</option>
        </select>
      </div>

      <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
