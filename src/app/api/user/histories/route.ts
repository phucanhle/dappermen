// src/app/api/user/histories/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { runtimeOrders } from "@/data/mockData";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  if (!isSupabaseConfigured) {
    const orders = runtimeOrders.filter((o) => o.user_id === userId);
    return NextResponse.json({ histories: orders });
  }

  try {
    // Try querying orders from Supabase database
    const { data: dbOrders, error } = await supabaseAdmin
      .from("orders")
      .select(`
        id,
        date:created_at,
        status,
        total,
        order_items (
          name,
          quantity,
          price
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase orders table error, falling back to local memory:", error.message);
      // Fallback to in-memory orders if table doesn't exist
      const orders = runtimeOrders.filter((o) => o.user_id === userId);
      return NextResponse.json({ histories: orders });
    }

    const formattedOrders = (dbOrders || []).map((o: any) => ({
      id: o.id,
      date: o.date,
      status: o.status,
      total: o.total,
      items: o.order_items || [],
    }));

    return NextResponse.json({ histories: formattedOrders });
  } catch (err) {
    console.error("Order histories fetch failed:", err);
    const orders = runtimeOrders.filter((o) => o.user_id === userId);
    return NextResponse.json({ histories: orders });
  }
}
