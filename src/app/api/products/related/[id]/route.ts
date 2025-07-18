// /api/products/related/[id].ts
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // await là bắt buộc

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
