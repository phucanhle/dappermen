import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import product from "@/types/Products";

export default function ProductCard({
    id,
    imageSrc,
    imageAlt,
    name,
    category,
    price,
}: product) {
    const [hovered, setHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const numberToVnd = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    return (
        <div
            className="relative w-[370px] h-[480px] md:w-[320px] md:h-[430px]  shadow-xl transition-all duration-300"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Ảnh sản phẩm */}
            <Image
                src={imageSrc}
                width={5000}
                height={5000}
                alt={imageAlt}
                className={`w-full h-full object-cover ${
                    hovered ? "blur-sm" : ""
                }`}
            />

            {/* Nút “See more” */}
            <div
                className={`absolute top-1/4 
                    flex justify-center items-center
                    w-full text-center transition-opacity duration-300 ${
                        hovered
                            ? "opacity-100"
                            : "opacity-0"
                    }`}
            >
                <Link
                    href={`/products/details/${id}`}
                    className="flex justify-center items-center right-1/2 w-[220px] p-2.5 text-[#ebebeb] bg-[#383838] hover:brightness-110 "
                    onClick={() => setIsLoading(true)}
                >
                    {isLoading ? (
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
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    ) : (
                        ""
                    )}
                    See more
                </Link>
            </div>

            {/* Overlay mở rộng từ dưới lên */}
            <div
                className={`absolute bottom-0 w-full overflow-hidden transition-all duration-300 bg-gradient-to-t from-black/80 to-transparent p-4 ${
                    hovered
                        ? "h-1/2 from-white/80 bg-white/85"
                        : "h-[25%]"
                }`}
            >
                <h2
                    className={`text-xl font-bold uppercase transition-colors duration-300 ${
                        hovered
                            ? "text-[#383838]"
                            : "text-[#ebebeb]"
                    }`}
                >
                    {name}
                </h2>
                <p
                    className={`text-sm capitalize transition-colors duration-300 ${
                        hovered
                            ? "text-[#383838]/80"
                            : "text-[#ebebeb]/80"
                    }`}
                >
                    {category}
                </p>

                {/* Chỉ hiện khi hover */}
                {hovered && (
                    <div className="flex flex-wrap mt-2">
                        <p className="text-2xl w-full text-right">
                            {numberToVnd(price)}
                        </p>
                        <div className="flex justify-between w-full mt-2">
                            <button className="size-10 bg-[#ebebeb] flex items-center justify-center shadow cursor-pointer">
                                <svg
                                    className="w-6 h-6 text-gray-800 "
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
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
                            <button className="w-[220px] h-10 text-[#ebebeb] bg-[#383838] shadow hover:brightness-110 cursor-pointer">
                                Add to cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
