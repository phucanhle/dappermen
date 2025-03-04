"use client";
import React from "react";
import ProductCard from "@/components/ProductCard";
import Promotion from "@/components/Promotion";
interface FavouriteProduct {
    name: string;
    price: number;
    imageSrc: string;
    imageAlt: string;
    category: string;
}

// Ví dụ dữ liệu tạm thời (sẽ thay bằng logic map sau)
const favouriteProducts: FavouriteProduct[] = [
    {
        name: "BASIC RELAXED-FIT COTTON T-SHIRT",
        price: 200000,
        imageSrc: "/images/product1.png",
        imageAlt: "1",
        category: "T-shirt",
    },
];

export default function Favourites() {
    return (
        <div className="w-full max-w-[1300px] mx-auto p-4">
            <Promotion />
            <h1 className="text-2xl font-bold mb-4">Favourites</h1>
            <div className="flex flex-wrap gap-4">
                {/* Tạm thời chỉ hiển thị một ProductCard, bạn có thể thay bằng logic map sau */}
                {favouriteProducts.map((product, index) => (
                    <ProductCard key={index} {...product} />
                ))}
            </div>
        </div>
    );
}
