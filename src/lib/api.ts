// lib/api.ts
import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { mockProducts } from "@/data/mockData";

export type ProductForSitemap = {
  id: number;
  slug: string;
  updated_at: string | null;
};

export async function getProductsForSitemap(): Promise<ProductForSitemap[]> {
  if (!isSupabaseConfigured) {
    return mockProducts.map((p) => ({
      id: p.id,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      updated_at: p.release_date,
    }));
  }

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
