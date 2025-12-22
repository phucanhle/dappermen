import Image from "next/image";
import Product from "@/types/Products";

import SizeGuide from "./SizeGuide";

const Imagebucket = process.env.NEXT_PUBLIC_IMAGE_BUCKET;

export default function ProductOverview({ product }: { product: Product }) {
  const imageUrl = product.image_src
    ? `${Imagebucket}/${product.image_src}`
    : "/placeholder.png";
  return (
    <div className="bg-neutral-100 border border-gray-200 px-4 md:px-8 py-5">
      <h2 className="text-2xl font-bold mb-4">Product Overview</h2>
      <div className="w-full">
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <Image
            src={imageUrl}
            alt={product.name}
            width={1300}
            height={1300}
            className="object-cover w-full max-w-2xl"
            loading="eager"
          />
          <p className="text-sm text-gray-700 leading-6 w-full md:w-1/2">
            {product.description || "Relaxed fit. Cotton fabric..."}
          </p>
        </div>
        <div className="flex justify-between gap-4 mt-2 flex-wrap md:flex-nowrap">
          <Image
            src={imageUrl}
            alt={product.name}
            width={1300}
            height={1300}
            className="max-w-1/2"
            loading="eager"
          />
          <Image
            src={imageUrl}
            alt={product.name}
            width={1300}
            height={1300}
            className="max-w-1/2"
            loading="eager"
          />
        </div>
      </div>
      <SizeGuide />
    </div>
  );
}
