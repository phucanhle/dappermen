// hooks/useProductDetails.ts
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Product from "@/types/Products";

export function useProductDetails(id?: string | string[]) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // Fetch product
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm!");
        const data = await res.json();
        setProduct(data);

        // Fetch related products
        const relatedRes = await fetch(`/api/products/related/${id}`);
        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          setRelatedProducts(relatedData);
        }
      } catch (error) {
        toast.error("Không tìm thấy sản phẩm!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { product, relatedProducts, loading };
}
