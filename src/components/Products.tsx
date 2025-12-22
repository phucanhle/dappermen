"use client";

import { useMemo } from "react";
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
                 gap-x-4 gap-y-8 px-4 max-w-7xl mx-auto min-h-200"
    >
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
