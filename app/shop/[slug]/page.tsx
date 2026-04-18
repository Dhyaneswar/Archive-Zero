import { notFound } from "next/navigation";

import { MotionSection } from "@/components/motion-section";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { getProduct, getRelatedProducts } from "@/lib/site-data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProduct(resolvedParams.slug);
  return {
    title: product ? product.name : "Product"
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product);

  return (
    <div className="space-y-10 md:space-y-16">
      <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <ProductGallery images={product.images.gallery} alt={product.name} />
        <ProductPurchasePanel product={product} />
      </section>

      <MotionSection className="page-section">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="editorial-kicker">Product story</p>
            <p className="mt-4 text-base leading-8 text-fog/78">{product.story}</p>
          </div>
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="editorial-kicker">Material details</p>
            <ul className="mt-4 space-y-3 text-base leading-8 text-fog/78">
              {product.materials.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="glass-panel rounded-[2rem] p-8">
            <p className="editorial-kicker">Fit / care / trust</p>
            <p className="mt-4 text-base leading-8 text-fog/78">{product.fit}</p>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-fog/72">
              {product.care.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <ul className="mt-5 space-y-2 text-sm leading-7 text-fog/72">
              {product.trust.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="page-section">
        <div className="mb-8">
          <p className="editorial-kicker">Related pieces</p>
          <h2 className="editorial-heading mt-3">Other chapters held nearby.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </MotionSection>
    </div>
  );
}
