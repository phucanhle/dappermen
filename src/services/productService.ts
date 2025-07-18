import Product from "@/types/Products";

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
