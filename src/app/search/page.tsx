"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Products from "@/components/Products";
import ProductFilter from "@/components/ProductFilter";
import { products } from "@/data/products";
import { Title } from "@/components/UI/Title";
import { Suspense } from "react";
import { LoadingSpin } from "@/components/UI/Loading"; // nếu có

export default function Wrapper() {
  return (
    <Suspense fallback={<LoadingSpin />}>
      <SearchPage />
    </Suspense>
  );
}

function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || ""; // 👈 từ URL: ?q=...
  const categoryParam = searchParams.get("category") || "All";
  const sortParam = searchParams.get("sort") || "price-low-high";

  const [category, setCategory] = useState(categoryParam);
  const [filter, setFilter] = useState(sortParam);

  const updateURL = (newCategory: string, newFilter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", newCategory);
    params.set("sort", newFilter);
    if (query) params.set("query", query); // đảm bảo q vẫn còn
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    updateURL(newCategory, filter);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    updateURL(category, newFilter);
  };

  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredProducts = useMemo(() => {
    const q = normalize(query);
    return products
      .filter((p) => normalize(p.name).includes(q))
      .filter((p) => category === "All" || p.category === category);
  }, [query, category]);

  return (
    <div className="min-h-screen p-4 max-w-[1440px] mx-auto">
      <Title>Search results for &quot;{query}&quot;</Title>
      <ProductFilter
        currentCategory={category}
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        onCategoryChange={handleCategoryChange}
      />
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No products found.</p>
      ) : (
        <Products
          products={filteredProducts}
          filter={filter}
          selectedCategory={category}
        />
      )}
    </div>
  );
}
