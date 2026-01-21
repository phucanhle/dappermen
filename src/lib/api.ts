// lib/api.ts
import { supabase } from "./supabaseClient";
export type ProductForSitemap = {
  id: number;
  slug: string;
  updated_at: string | null;
};

export async function getProductsForSitemap(): Promise<ProductForSitemap[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, slug, updated_at")
    .eq("is_published", true);

  if (error) {
    console.error("getProductsForSitemap error:", error);
    return [];
  }

  return data ?? [];
}
