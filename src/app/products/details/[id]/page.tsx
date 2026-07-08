// src/app/products/details/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";

// Hooks
import { useProductDetails } from "@/hooks/useProductDetails";

// UI
import { LoadingSpin } from "@/components/UI/Loading";
import ProductReviews from "@/components/ProductReviews";
import ProductOverview from "@/components/ProductOverview";
import ProductRelated from "@/components/ProductRelate";
import ProductInformation from "@/components/ProductInformation";
import { getProductImageUrl } from "@/lib/imageHelper";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, relatedProducts, loading } = useProductDetails(id);

  const imageUrl = useMemo(() => {
    if (product?.image_src?.length) {
      return getProductImageUrl(product.image_src);
    }
    return "/placeholder.png";
  }, [product]);

  if (loading || !product)
    return (
      <div className="max-w-7xl min-h-screen mx-auto px-4 py-16 flex flex-col justify-center items-center">
        <LoadingSpin />
        <p className="text-center text-neutral-400 font-sans text-sm mt-3 animate-pulse">
          Loading collection details...
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-10">
      {/* Editorial Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Aspect Ratio Editorial Image Card */}
        <div className="md:col-span-6 w-full flex justify-center bg-white border border-[#EAE7E2]/50 rounded-2xl overflow-hidden shadow-xs relative aspect-[3/4] max-h-[560px]">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover animate-fade-in"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png";
            }}
            priority
          />
        </div>
        
        {/* Right Info Section */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <ProductInformation product={product} />
        </div>
      </div>

      {/* Details Specifications Sheet */}
      <ProductOverview product={product} />

      {/* Reviews Feedback */}
      <ProductReviews productId={product.id} />

      {/* Related curated items */}
      <ProductRelated relatedProducts={relatedProducts} />
    </div>
  );
}
