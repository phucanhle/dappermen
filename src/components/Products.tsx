"use client";

import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
import Product from "@/types/Products";

type Props = {
  products: Product[];
  filter: string;
  selectedCategory: string;
};

const ALL_CATEGORY = "All";

function sortProducts(products: Product[], filter: string): Product[] {
  switch (filter) {
    case "price-low-high":
      return products.slice().sort((a, b) => a.price - b.price);
    case "price-high-low":
      return products.slice().sort((a, b) => b.price - a.price);
    case "date-newest":
      return products
        .slice()
        .sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
    case "date-oldest":
      return products
        .slice()
        .sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
    default:
      return products;
  }
}

export default function Products({
  products,
  filter,
  selectedCategory,
}: Props) {
  const filteredProducts = useMemo(() => {
    const byCategory =
      selectedCategory === ALL_CATEGORY
        ? products
        : products.filter((p) => p.category === selectedCategory);

    return sortProducts(byCategory, filter);
  }, [products, filter, selectedCategory]);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 
                 gap-8 px-4 w-screen md:max-w-7xl mx-auto min-h-200"
    >
      {filteredProducts.map((product, index) => (
        <React.Fragment key={product.id}>
          {index === 4 && (
            <div className="col-span-1 sm:col-span-2 bg-[#ede9e0]/60 border border-neutral-300/40 rounded-xl p-8 flex flex-col justify-between min-h-[240px] shadow-xs select-none">
              <div>
                <span className="text-[10px] tracking-widest text-[#d4af37] font-semibold uppercase">
                  Editorial Lookbook
                </span>
                <blockquote className="font-serif text-lg md:text-xl font-light text-neutral-800 leading-relaxed mt-4 italic">
                  &ldquo;Dressing well is a form of good manners. Elegance is not about standing out, but about being remembered.&rdquo;
                </blockquote>
              </div>
              <div className="mt-6 border-t border-neutral-300/30 pt-3 flex items-center justify-between text-[11px] text-neutral-500 font-sans tracking-wide">
                <span>EST. 2026</span>
                <span className="font-serif">— G. Bruce Boyer</span>
              </div>
            </div>
          )}
          <ProductCard {...product} />
        </React.Fragment>
      ))}
    </div>
  );
}
