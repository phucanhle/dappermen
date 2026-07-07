"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import product from "@/types/Products";
import { useCartStore } from "@/stores/cartStore";
import { useFavouritesStore } from "@/stores/favouritesStore";
import toast from "react-hot-toast";

import { getProductImageUrl } from "@/lib/imageHelper";

export default function ProductCard(props: product) {
  const { id, image_src, image_alt, name, category, price, release_date } = props;
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const addItem = useCartStore((state) => state.addItem);
  const { toggleFavourite, isFavourite } = useFavouritesStore();
  const isFav = isFavourite(id);

  const imageUrl = getProductImageUrl(image_src);

  const numberToVnd = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      image_src: image_src || "",
      name,
      price,
      size: "M", // Default size on grid add
      quantity: 1,
    });
    toast.success(`Added "${name}" (Size M) to cart!`);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(props);
    toast.success(isFav ? "Removed from Favourites" : "Added to Favourites");
  };

  return (
    <div
      className="group relative w-full aspect-3/4 sm:max-w-[320px] md:max-w-68 rounded-xl overflow-hidden shadow-sm hover:shadow-premium bg-white border border-neutral-100 transition-all duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image Link */}
      <Link href={`/products/details/${id}`} className="block relative w-full h-full">
        <Image
          src={imageUrl}
          fill
          alt={
            `${image_alt} released in ${release_date}` ||
            "Product image not available"
          }
          className={`w-full object-cover transition-transform duration-700 ease-out ${
            hovered ? "scale-105" : "scale-100"
          }`}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          priority={id <= 4}
        />
      </Link>

      {/* Quick Details Overlay */}
      <div
        className={`absolute top-1/3 left-0 right-0 flex justify-center items-center text-center transition-all duration-300 pointer-events-none ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <Link
          href={`/products/details/${id}`}
          className="pointer-events-auto flex justify-center items-center px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-neutral-900/90 hover:bg-neutral-900 shadow-md backdrop-blur-xs transition-colors"
          onClick={() => setIsLoading(true)}
          aria-label="See more details"
        >
          {isLoading && (
            <svg
              className="mr-2 w-4 h-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          Quick View
        </Link>
      </div>

      {/* Info Overlay Panel */}
      <div
        className={`absolute bottom-0 w-full overflow-hidden transition-all duration-500 flex flex-col justify-end p-4 ${
          hovered
            ? "h-1/2 bg-white/95 border-t border-neutral-100 shadow-lg"
            : "h-[30%] bg-gradient-to-t from-black/80 via-black/40 to-transparent"
        }`}
      >
        {/* Tên sản phẩm */}
        <h2
          className={`text-sm md:text-base font-bold capitalize text-left transition-colors duration-300 line-clamp-1 ${
            hovered ? "text-neutral-900" : "text-white"
          }`}
        >
          {name}
        </h2>

        {/* Danh mục */}
        <p
          className={`text-xs capitalize text-left transition-colors duration-300 mt-0.5 line-clamp-1 ${
            hovered ? "text-neutral-500" : "text-neutral-300"
          }`}
        >
          {category}
        </p>

        {/* Price and Action Row */}
        <div className={`transition-all duration-300 ${hovered ? "mt-2 opacity-100" : "mt-0"}`}>
          {/* Giá tiền */}
          <p className={`text-sm md:text-base font-semibold text-left transition-colors duration-300 ${
            hovered ? "text-neutral-900" : "text-[#d4af37]"
          }`}>
            {numberToVnd(price)}
          </p>
          
          {/* Quick buttons */}
          {hovered && (
            <div className="flex justify-between items-center gap-2 mt-3 animate-fade-in-up">
              {/* Add to favorites */}
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors shadow-xs hover:shadow-sm cursor-pointer ${
                  isFav 
                    ? "bg-red-50 border-red-200 text-red-500" 
                    : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100"
                }`}
                onClick={handleToggleFav}
                aria-label="Add to favorites"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isFav ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
              </button>
              
              {/* Add to cart */}
              <button
                className="flex-1 h-10 rounded-lg text-xs md:text-sm font-semibold uppercase tracking-wider text-white bg-neutral-950 hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
                onClick={handleAddToCart}
                aria-label="Add to cart"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
