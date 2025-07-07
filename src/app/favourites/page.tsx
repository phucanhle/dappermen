"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";
import Promotion from "@/components/Promotion";
import Product from "@/types/Products";

const favouriteProducts: Product[] = [
    {
        id: 11,
        name: "BASIC RELAXED-FIT COTTON T-SHIRT",
        price: 200000,
        imageSrc: "/images/product1.png",
        imageAlt: "1",
        category: "T-shirt",
        releaseDate: "2024-07-05",
    },
];

export default function Favourites() {
    return (
        <div className="w-full max-w-[1300px] mx-auto p-4">
            <Promotion />
            <h1 className="text-2xl font-bold mb-4">
                Favourites
            </h1>

            {favouriteProducts.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                    {favouriteProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">
                    You don&apos;t have any favourite
                    products yet
                </p>
            )}
        </div>
    );
}
