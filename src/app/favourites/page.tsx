"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";
import Promotion from "@/components/Promotion";
import { useFavouritesStore } from "@/stores/favouritesStore";

export default function Favourites() {
  const favouriteProducts = useFavouritesStore((state) => state.items);

  return (
    <div className="w-full max-w-[1300px] mx-auto p-4 min-h-[60vh] mt-24">
      <Promotion />
      <h1 className="text-2xl font-bold mt-10 mb-4 text-neutral-800">Favourites</h1>

      {favouriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favouriteProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200 mt-6">
          <p className="text-neutral-500 font-medium">
            You don&apos;t have any favourite products yet.
          </p>
        </div>
      )}
    </div>
  );
}
