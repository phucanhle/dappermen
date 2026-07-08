// src/app/api/admin/products/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { mockProducts, mockProductSizes } from "@/data/mockData";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Fallback if Supabase is not configured
  if (!isSupabaseConfigured) {
    const productsWithStock = mockProducts.map((p) => {
      const sizes = mockProductSizes[p.id] || [
        { size: "S", stock: 10 },
        { size: "M", stock: 15 },
        { size: "L", stock: 12 },
        { size: "XL", stock: 5 },
      ];
      return {
        ...p,
        sizes,
      };
    });
    return NextResponse.json({ success: true, products: productsWithStock });
  }

  // 2. Query from Supabase
  try {
    const { data: dbProducts, error: prodErr } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("id", { ascending: true });

    if (prodErr) throw prodErr;

    const { data: dbSizes, error: sizeErr } = await supabaseAdmin
      .from("product_sizes")
      .select(`
        product_id,
        stock,
        sizes (
          name
        )
      `);

    if (sizeErr) throw sizeErr;

    const products = dbProducts || [];
    const sizes = dbSizes || [];

    const productsWithStock = products.map((p) => {
      const pSizes = sizes
        .filter((s: any) => s.product_id === p.id)
        .map((s: any) => ({
          size: s.sizes?.name || "",
          stock: s.stock,
        }));
      
      const defaultSizes = ["S", "M", "L", "XL"];
      const finalSizes = defaultSizes.map((sz) => {
        const found = pSizes.find((ps) => ps.size === sz);
        return found ? found : { size: sz, stock: 0 };
      });

      return {
        ...p,
        sizes: finalSizes,
      };
    });

    return NextResponse.json({ success: true, products: productsWithStock });
  } catch (err: any) {
    console.error("Fetch admin products failed:", err);
    const productsWithStock = mockProducts.map((p) => {
      const sizes = mockProductSizes[p.id] || [];
      return { ...p, sizes };
    });
    return NextResponse.json({ success: true, products: productsWithStock });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { productId, size, stock } = await req.json();

    if (productId === undefined || !size || stock === undefined) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const stockNum = parseInt(stock, 10);
    const prodIdNum = parseInt(productId, 10);

    if (Number.isNaN(stockNum) || stockNum < 0) {
      return NextResponse.json(
        { error: "Stock phải là số lớn hơn hoặc bằng 0" },
        { status: 400 }
      );
    }

    // 1. Update in local memory
    if (mockProductSizes[prodIdNum]) {
      const sIndex = mockProductSizes[prodIdNum].findIndex((s) => s.size === size);
      if (sIndex !== -1) {
        mockProductSizes[prodIdNum][sIndex].stock = stockNum;
      } else {
        mockProductSizes[prodIdNum].push({ size, stock: stockNum });
      }
    } else {
      mockProductSizes[prodIdNum] = [{ size, stock: stockNum }];
    }

    // 2. Update in Supabase
    if (isSupabaseConfigured) {
      const { data: sizeData, error: sizeErr } = await supabaseAdmin
        .from("sizes")
        .select("id")
        .eq("name", size)
        .single();

      if (sizeErr || !sizeData) {
        throw new Error(sizeErr?.message || `Size name ${size} not found in database`);
      }

      const sizeId = sizeData.id;

      const { error: upsertErr } = await supabaseAdmin
        .from("product_sizes")
        .upsert(
          {
            product_id: prodIdNum,
            size_id: sizeId,
            stock: stockNum,
          },
          { onConflict: "product_id,size_id" }
        );

      if (upsertErr) {
        throw upsertErr;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Tồn kho size ${size} của sản phẩm #${productId} đã cập nhật thành ${stockNum}`,
    });
  } catch (err: any) {
    console.error("Update stock failed:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update stock" },
      { status: 500 }
    );
  }
}
