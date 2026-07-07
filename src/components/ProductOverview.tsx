// src/components/ProductOverview.tsx
import Product from "@/types/Products";
import SizeGuide from "./SizeGuide";

export default function ProductOverview({ product }: { product: Product }) {
  return (
    <div className="bg-[#FAF8F5] border border-[#EAE7E2]/75 rounded-2xl p-6 md:p-8 animate-fade-in mt-6">
      <h2 className="font-serif text-2xl font-normal text-neutral-900 mb-6 border-b border-[#EAE7E2]/60 pb-3">
        Product Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-3">
            Description
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed font-sans">
            {product.description || "Relaxed fit. Structured cut. Meticulously stitched from selected fabrics to preserve form, comfort, and character over time."}
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-3">
            Specifications & Care
          </h3>
          <ul className="text-xs text-neutral-500 font-sans space-y-2 list-disc list-inside">
            <li>Premium long-staple yarn fibers for maximum durability</li>
            <li>Reinforced seam stitching for active shape preservation</li>
            <li>Machine wash cold with like colors, gentle cycle</li>
            <li>Tumble dry low or line dry in shade</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-[#EAE7E2]/60 pt-6">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-4">
          Size Chart Guide
        </h3>
        <SizeGuide />
      </div>
    </div>
  );
}
