import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { mockProductSizes } from "@/data/mockData";

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

  if (!isSupabaseConfigured) {
    const sizes = mockProductSizes[productId] || [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 12 },
      { size: "XL", stock: 5 }
    ];
    return NextResponse.json({
      success: true,
      data: sizes,
    });
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
