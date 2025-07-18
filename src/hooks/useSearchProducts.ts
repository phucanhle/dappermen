// hooks/useSearchProducts.ts
"use client";

import { useState, useCallback } from "react";
import { fetchProducts } from "@/services/productService";
import Product from "@/types/Products";

const LIMIT = 8;

export default function useSearchProducts(
  query: string,
  category: string,
  sort: string
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const fetchFiltered = useCallback(
    async (offsetVal: number, append = false): Promise<void> => {
      setIsLoading(true);
      try {
        const allData = await fetchProducts({
          offset: offsetVal,
          limit: LIMIT,
          category,
          sort,
        });

        const q = normalize(query);
        const filtered = allData.filter((p) => normalize(p.name).includes(q));

        if (append) {
          setProducts((prev) => [...prev, ...filtered]);
        } else {
          setProducts(filtered);
        }

        setHasMore(filtered.length === LIMIT);
        setOffset(offsetVal);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [query, category, sort]
  );

  const reloadProducts = useCallback(() => {
    fetchFiltered(0, false);
  }, [fetchFiltered]);

  const loadMore = useCallback(() => {
    fetchFiltered(offset + LIMIT, true);
  }, [fetchFiltered, offset]);

  return {
    products,
    isLoading,
    hasMore,
    loadMore,
    reloadProducts,
  };
}
