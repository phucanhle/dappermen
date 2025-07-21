import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

type RawProductSize = {
  stock: number;
  sizes: {
    name: string;
  };
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    return NextResponse.json(
      { success: false, message: "Invalid product ID" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("product_sizes")
    .select(
      `
        stock,
        sizes (
          name
        )
      `
    )
    .eq("product_id", productId);

  if (error) {
    console.error("[Supabase error]", error);
    return NextResponse.json(
      { success: false, message: "Supabase error" },
      { status: 500 }
    );
  }

  const rows = data as unknown as RawProductSize[];

  const sizesWithStock = rows.map((item) => ({
    size: item.sizes.name,
    stock: item.stock,
  }));

  return NextResponse.json({
    success: true,
    data: sizesWithStock,
  });
}
