import { CartPageClient } from "@/components/cart-page-client";
import { MotionSection } from "@/components/motion-section";

export const metadata = {
  title: "Cart"
};

export default function CartPage() {
  return (
    <div className="space-y-10 md:space-y-16">
      <MotionSection className="page-section">
        <div className="glass-panel rounded-[2rem] p-8 md:p-10">
          <p className="editorial-kicker">Cart / held pieces</p>
          <h1 className="editorial-heading mt-4">A quieter checkout, still designed like part of the campaign.</h1>
        </div>
      </MotionSection>

      <MotionSection className="page-section">
        <CartPageClient />
      </MotionSection>
    </div>
  );
}
