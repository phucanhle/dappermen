import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; 
  const idNum = parseInt(id, 10);

  if (Number.isNaN(idNum)) {
    return NextResponse.json({ message: "ID không hợp lệ!" }, { status: 400 });
  }

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", idNum)
    .single();

  if (error || !product) {
    return NextResponse.json(
      { message: "Sản phẩm không tồn tại!" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
