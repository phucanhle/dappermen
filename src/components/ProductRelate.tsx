//Types
import Product from "@/types/Products";

//Components
import ProductCard from "./ProductCard";

//Main
export default function ProductRelated({
  relatedProducts,
}: {
  relatedProducts: Product[];
}) {
  return (
    <div className="bg-neutral-100 border border-gray-200 px-4 md:px-8 py-5">
      <h2 className="text-lg font-bold mb-4">Related products</h2>
      <div className="overflow-x-auto">
        {relatedProducts.length > 0 && (
          <div className="flex gap-4" style={{ minWidth: "900px" }}>
            {relatedProducts.map((related: Product) => (
              <div key={related.id} className="flex-none w-[320px]">
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
        )}
      </div>
    </div>
  );
}
