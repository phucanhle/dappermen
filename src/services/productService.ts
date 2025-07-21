import Product, { ProductSize } from "@/types/Products";

type FetchOptions = {
  offset?: number;
  limit?: number;
  category?: string;
  sort?: string;
};

export async function fetchProducts({
  offset = 0,
  limit = 10,
  category = "All",
  sort = "price-low-high",
}: FetchOptions): Promise<Product[]> {
  try {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      category,
      sort,
    });

    const res = await fetch(`/api/products?${params.toString()}`);

    if (!res.ok) {
      console.error("Failed to fetch products:", res.statusText);
      return [];
    }

    const data = await res.json();
    return data.data as Product[];
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    return [];
  }
}

export async function getProductSizes(
  productId: number
): Promise<ProductSize[]> {
  try {
    const res = await fetch(`/api/products/${productId}/sizes`);
    const json = await res.json();

    if (!json.success) throw new Error("Failed to fetch sizes");

    return json.data;
  } catch (error) {
    console.error("Error fetching product sizes:", error);
    throw error;
  }
}
