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
    // 1. Fetch user orders
    const { data: dbOrders, error: orderErr } = await supabaseAdmin
      .from("orders")
      .select(`
        id,
        date:created_at,
        status,
        total
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (orderErr) {
      console.warn("Supabase orders table error, falling back to local memory:", orderErr.message);
      const orders = runtimeOrders.filter((o) => o.user_id === userId);
      return NextResponse.json({ histories: orders });
    }

    // 2. Fetch order items for retrieved orders
    const orderIds = (dbOrders || []).map((o) => o.id);
    let itemsList: any[] = [];
    if (orderIds.length > 0) {
      const { data: dbItems, error: itemsErr } = await supabaseAdmin
        .from("order_items")
        .select("order_id, name, quantity, price")
        .in("order_id", orderIds);
      if (!itemsErr && dbItems) {
        itemsList = dbItems;
      }
    }

    // 3. Map items to their respective orders
    const formattedOrders = (dbOrders || []).map((o: any) => {
      const oItems = itemsList
        .filter((item: any) => item.order_id === o.id)
        .map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }));

      return {
        id: o.id,
        date: o.date,
        status: o.status,
        total: o.total,
        items: oItems,
      };
    });

    return NextResponse.json({ histories: formattedOrders });
  } catch (err) {
    console.error("Order histories fetch failed:", err);
    const orders = runtimeOrders.filter((o) => o.user_id === userId);
    return NextResponse.json({ histories: orders });
  }
}
