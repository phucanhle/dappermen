// src/components/ProductRelate.tsx
import Product from "@/types/Products";
import ProductCard from "./ProductCard";

export default function ProductRelated({
  relatedProducts,
}: {
  relatedProducts: Product[];
}) {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <div className="mt-12 animate-fade-in">
      <h2 className="font-serif text-2xl font-normal text-neutral-900 mb-6 border-b border-[#EAE7E2]/60 pb-3">
        You May Also Like
      </h2>
      <div className="overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex gap-6 w-max">
          {relatedProducts.map((related: Product) => (
            <div key={related.id} className="w-[240px] flex-shrink-0">
              <ProductCard
                id={related.id}
                name={related.name}
                price={related.price}
                image_src={related.image_src}
                image_alt={related.name}
                category={related.category}
                release_date={related.release_date}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
