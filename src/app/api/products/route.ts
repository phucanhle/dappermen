// src/app/api/products/route.ts

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const limit = Number(searchParams.get("limit") ?? 10);
  const offset = Number(searchParams.get("offset") ?? 0);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");

  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .order("id", { ascending: true });

  // Lọc theo category
  if (category && category !== "All") {
    query = query.eq("category", category);
  }

  // Tìm kiếm tên
  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  // Sắp xếp
  switch (sort) {
    case "price-low-high":
      query = query.order("price", { ascending: true });
      break;
    case "price-high-low":
      query = query.order("price", { ascending: false });
      break;
    case "date-oldest":
      query = query.order("release_date", { ascending: true });
      break;
    case "date-newest":
    default:
      query = query.order("release_date", { ascending: false });
      break;
  }

  // Phân trang
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    total: count,
    hasMore: offset + limit < (count ?? 0),
  });
}
