"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductFilter from "@/components/ProductFilter";
import Products from "@/components/Products";
import { Title } from "@/components/UI/Title";
import { LoadingSpin } from "@/components/UI/Loading";
import useSearchProducts from "@/hooks/useSearchProducts";

export default function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("query") || "";
  const categoryParam = searchParams.get("category") || "All";
  const sortParam = searchParams.get("sort") || "price-low-high";

  const [category, setCategory] = useState(categoryParam);
  const [filter, setFilter] = useState(sortParam);

  const { products, isLoading, hasMore, loadMore, reloadProducts } =
    useSearchProducts(query, category, filter);

  const updateURL = (newCategory: string, newFilter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", newCategory);
    params.set("sort", newFilter);
    if (query) params.set("query", query);
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

  useEffect(() => {
    reloadProducts();
  }, [reloadProducts]);

  return (
    <div className="min-h-screen p-4 max-w-[1440px] mx-auto">
      <Title>Search results for &quot;{query}&quot;</Title>

      <ProductFilter
        currentCategory={category}
        currentFilter={filter}
        onFilterChange={handleFilterChange}
        onCategoryChange={handleCategoryChange}
      />

      {isLoading && products.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpin />
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No products found.</p>
      ) : (
        <>
          <Products
            products={products}
            filter={filter}
            selectedCategory={category}
          />
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                See more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
