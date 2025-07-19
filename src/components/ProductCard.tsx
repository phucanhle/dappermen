"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import product from "@/types/Products";

export default function ProductCard({
  id,
  image_src,
  image_alt,
  name,
  category,
  price,
  release_date,
}: product) {
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Imagebucket = process.env.NEXT_PUBLIC_IMAGE_BUCKET;

  const imageUrl = image_src
    ? `${Imagebucket}/${image_src}`
    : "/placeholder.png";

  const numberToVnd = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <div
      className="relative w-full max-w-[420px] aspect-[3/4] md:max-w-[320px] shadow-xl transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ảnh sản phẩm */}
      <Image
        src={imageUrl}
        width={370}
        height={430}
        alt={
          `${image_alt} release in ${release_date}` ||
          "Product image not available"
        }
        className={`w-full object-cover transition-all duration-300 ${
          hovered ? "blur-sm" : ""
        }`}
      />

      {/* Nút xem chi tiết */}
      <div
        className={`absolute top-1/4 w-full flex justify-center items-center text-center transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link
          href={`/products/details/${id}`}
          className="flex justify-center items-center w-[220px] p-2.5 text-[#ebebeb] bg-[#383838] hover:brightness-110"
          onClick={() => setIsLoading(true)}
          aria-label="See more details"
        >
          {isLoading && (
            <svg
              className="mr-3 w-5 h-5 animate-spin text-white"
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
          See more
        </Link>
      </div>

      {/* Overlay thông tin */}
      <div
        className={`absolute bottom-0 w-full overflow-hidden transition-all duration-300 bg-gradient-to-t p-4 ${
          hovered
            ? "h-1/2 from-white/80 to-transparent bg-white/85"
            : "h-[25%] from-black/80 to-transparent"
        }`}
      >
        {/* Tên sản phẩm */}
        <h2
          className={`text-lg font-bold capitalize text-left transition-colors duration-300 line-clamp-1 break-words ${
            hovered ? "text-[#383838]" : "text-[#ebebeb]"
          }`}
        >
          {name}
        </h2>

        {/* Danh mục */}
        <p
          className={`text-xs md:text-sm capitalize text-left transition-colors duration-300 line-clamp-1 ${
            hovered ? "text-[#383838]/80" : "text-[#ebebeb]/80"
          }`}
        >
          {category}
        </p>

        {hovered && (
          <div className="flex flex-wrap mt-2">
            {/* Giá tiền */}
            <p className="w-full text-lg md:text-2xl text-right font-semibold text-[#383838]">
              {numberToVnd(price)}
            </p>
            <div className="flex justify-between w-full mt-2">
              <button
                className="size-10 bg-[#ebebeb] flex items-center justify-center shadow"
                aria-label="Add to favorites"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
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
              {/* Nút Add to cart */}
              <button
                className="flex-1 min-w-[140px] h-10 text-sm md:text-base text-[#ebebeb] bg-[#383838] shadow hover:brightness-110 transition-all"
                aria-label="Add to cart"
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
