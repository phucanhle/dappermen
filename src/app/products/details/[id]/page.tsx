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

// Constants
const ImageBucket = process.env.NEXT_PUBLIC_IMAGE_BUCKET || "";

// Main Component
export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, relatedProducts, loading } = useProductDetails(id);

  const imageUrl = useMemo(() => {
    if (product?.image_src?.length)
      return `${ImageBucket}/${product.image_src}`;
    return "/placeholder.png";
  }, [product]);

  if (loading || !product)
    return (
      <div className="max-w-screen-xl min-h-screen mx-auto px-4 py-8">
        <LoadingSpin />
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Product Image & Info */}
      <div className="flex flex-wrap w-full justify-around gap-4 md:gap-10 md:justify-between">
        <div className="flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={product.name}
            width={320}
            height={430}
            className="w-screen md:w-auto md:h-full object-cover border border-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.png";
            }}
          />
        </div>
        <ProductInformation product={product} />
      </div>

      {/* Other Sections */}
      <ProductOverview product={product} />
      <ProductReviews />
      <ProductRelated relatedProducts={relatedProducts} />
    </div>
  );
}
