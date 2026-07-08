// src/app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { runtimeOrders } from "@/data/mockData";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Fallback if Supabase is not configured
  if (!isSupabaseConfigured) {
    const sorted = [...runtimeOrders].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return NextResponse.json({ success: true, orders: sorted });
  }

  // 2. Query from Supabase
  try {
    const { data: dbOrders, error: orderErr } = await supabaseAdmin
      .from("orders")
      .select(`
        id,
        user_id,
        created_at,
        status,
        total,
        payment_method,
        shipping_name,
        shipping_phone,
        shipping_address
      `)
      .order("created_at", { ascending: false });

    if (orderErr) {
      throw orderErr;
    }

    const { data: dbItems, error: itemsErr } = await supabaseAdmin
      .from("order_items")
      .select("order_id, name, quantity, price");

    // Even if items table fails, we continue with empty items to avoid blocking orders view
    const itemsList = dbItems || [];

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
        user_id: o.user_id,
        date: o.created_at,
        status: o.status,
        total: o.total,
        payment_method: o.payment_method,
        shipping_name: o.shipping_name,
        shipping_phone: o.shipping_phone,
        shipping_address: o.shipping_address,
        items: oItems,
      };
    });

    return NextResponse.json({ success: true, orders: formattedOrders });
  } catch (err: any) {
    console.error("Fetch all orders failed:", err);
    const sorted = [...runtimeOrders].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return NextResponse.json({ success: true, orders: sorted });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Update in local memory
    const orderIndex = runtimeOrders.findIndex((o) => o.id === orderId);
    if (orderIndex !== -1) {
      runtimeOrders[orderIndex].status = status;
    }

    // 2. Update in Supabase
    if (isSupabaseConfigured) {
      const { error } = await supabaseAdmin
        .from("orders")
        .update({ status })
        .eq("id", orderId);

      if (error) {
        throw error;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Order status updated to ${status}`,
    });
  } catch (err: any) {
    console.error("Update order status failed:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update order status" },
      { status: 500 }
    );
  }
}
