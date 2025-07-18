"use client";

import { useEffect, useState, useCallback } from "react";
import Products from "./Products";
import ProductFilter from "./ProductFilter";
import { fetchProducts } from "@/services/productService";
import Product from "@/types/Products";

const LIMIT = 8;

export default function ProductWrapper() {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState("price-low-high");
  const [category, setCategory] = useState("All");

  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Fetch sản phẩm ban đầu hoặc khi filter/category thay đổi
  const loadInitialProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts({
        offset: 0,
        limit: LIMIT,
        category,
        sort: filter,
      });
      setProducts(data);
      setOffset(0);
      setHasMore(data.length === LIMIT);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [category, filter]);

  useEffect(() => {
    loadInitialProducts();
  }, [loadInitialProducts]);

  // Load thêm sản phẩm khi người dùng bấm nút
  const handleLoadMore = async () => {
    const newOffset = offset + LIMIT;
    const data = await fetchProducts({
      offset: newOffset,
      limit: LIMIT,
      category,
      sort: filter,
    });

    setProducts((prev) => [...prev, ...data]);
    setOffset(newOffset);
    if (data.length < LIMIT) setHasMore(false);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <ProductFilter
        onFilterChange={setFilter}
        onCategoryChange={setCategory}
      />

      {isLoading ? (
        <p className="text-gray-500 my-4">Loading products...</p>
      ) : (
        <Products
          products={products}
          filter={filter}
          selectedCategory={category}
        />
      )}

      {!isLoading && hasMore && (
        <button
          onClick={handleLoadMore}
          className="my-4 px-10 py-2 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 transition-all"
        >
          See more
        </button>
      )}

      {!isLoading && !hasMore && products.length > 0 && (
        <p className="text-sm text-gray-400 my-4">All products displayed.</p>
      )}
    </div>
  );
}
