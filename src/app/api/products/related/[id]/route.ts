// /api/products/related/[id].ts
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { mockProducts } from "@/data/mockData";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 
  const idNum = parseInt(id, 10);

  if (!isSupabaseConfigured) {
    const currentProduct = mockProducts.find((p) => p.id === idNum);
    if (!currentProduct) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    const related = mockProducts
      .filter((p) => p.category === currentProduct.category && p.id !== idNum)
      .slice(0, 4);

    return NextResponse.json(related);
  }

  // Lấy sản phẩm hiện tại
  const { data: currentProduct, error } = await supabase
    .from("products")
    .select("category")
    .eq("id", id)
    .single();

  if (error || !currentProduct) {
    return NextResponse.json(
      { message: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );
  }

  // Lấy các sản phẩm cùng category, trừ sản phẩm hiện tại
  const { data: related, error: relatedError } = await supabase
    .from("products")
    .select("*")
    .eq("category", currentProduct.category)
    .neq("id", id)
    .limit(4);

  if (relatedError) {
    return NextResponse.json({ message: "Lỗi truy vấn" }, { status: 500 });
  }

  return NextResponse.json(related);
}
