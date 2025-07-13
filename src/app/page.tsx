"use client";
import { useState } from "react";
import Carousels from "@/components/Carousels";
import Products from "@/components/Products";
import ProductFilter from "@/components/ProductFilter";
import { Title } from "@/components/UI/Title";

import { products } from "@/data/products";
export default function Home() {
  const [filter, setFilter] = useState("price-low-high");
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Carousels />

      <Title className="text-center">Products</Title>
      <ProductFilter
        onFilterChange={(f) => setFilter(f)}
        onCategoryChange={(c) => setCategory(c)}
      />
      <Products
        products={products}
        filter={filter}
        selectedCategory={category}
      />
    </div>
  );
}
