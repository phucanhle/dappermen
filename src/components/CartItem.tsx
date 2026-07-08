// src/components/CartItem.tsx
import Image from "next/image";
import { cartItem } from "@/types/CartItem";
import Link from "next/link";
import { getProductSizeQty } from "@/services/productService";
import { useEffect, useState } from "react";
import { getProductImageUrl } from "@/lib/imageHelper";

export default function CartItem({
  id,
  image_src,
  name,
  price,
  size,
  quantity,
  onDelete,
  onQuantityChange,
}: cartItem) {
  const imageUrl = getProductImageUrl(image_src);
  const [maxStock, setMaxStock] = useState<number>(10);

  useEffect(() => {
    const getStock = async () => {
      try {
        const qty = await getProductSizeQty(id, size);
        setMaxStock(qty || 10);
      } catch (error) {
        console.error("Failed to fetch max stock:", error);
      }
    };
    getStock();
  }, [id, size]);

  return (
    <div className="flex flex-row items-center justify-between border-b border-[#EAE7E2]/70 py-6 last:border-b-0 w-full gap-4 animate-fade-in">
      <div className="flex items-center flex-1">
        {/* Sleek, proportional image container */}
        <div className="w-20 h-24 sm:w-24 sm:h-30 relative overflow-hidden rounded-lg border border-[#EAE7E2]/60 bg-neutral-50 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 80px, 96px"
            priority
          />
        </div>
        
        {/* Description Details */}
        <div className="ml-4 flex flex-col justify-between py-1">
          <div>
            <Link
              href={`/products/details/${id}`}
              className="font-serif text-base font-normal text-neutral-900 hover:text-[#d4af37] transition-colors leading-tight"
            >
              {name}
            </Link>
            <p className="text-xs text-neutral-400 font-sans tracking-wide mt-0.5">
              Size: <span className="font-semibold text-neutral-700">{size}</span>
            </p>
          </div>
          
          <div className="mt-3 flex items-center gap-4">
            <span className="text-xs font-semibold text-neutral-800 font-sans">
              {(price * quantity).toLocaleString()} VND
            </span>
            
            <div className="flex items-center gap-1.5 border border-[#EAE7E2] rounded px-2 py-0.5 bg-[#FAF8F5]">
              <span className="text-[10px] text-neutral-400 font-sans font-semibold uppercase tracking-wider">
                Qty:
              </span>
              <input
                type="number"
                min={1}
                max={maxStock}
                value={quantity}
                aria-label={`Quantity for ${name}`}
                className="w-10 text-center bg-transparent border-0 p-0 text-xs font-sans font-semibold text-neutral-800 focus:outline-none"
                onChange={(e) => onQuantityChange?.(Number(e.target.value))}
                onBlur={() => {
                  let val = quantity;
                  if (val < 1) val = 1;
                  if (val > maxStock) val = maxStock;
                  onQuantityChange?.(val);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className="text-[10px] text-neutral-400 hover:text-red-500 uppercase tracking-widest font-sans font-bold cursor-pointer select-none transition-colors border border-transparent hover:border-red-200 rounded px-3 py-1 bg-neutral-50 hover:bg-red-50/30"
        onClick={onDelete}
        title="Remove Item"
      >
        Delete
      </button>
    </div>
  );
}
