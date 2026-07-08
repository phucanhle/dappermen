// src/app/api/orders/confirm/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { runtimeOrders } from "@/data/mockData";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = await req.json();

  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  // 1. Update in local memory (mockData fallback)
  const orderIndex = runtimeOrders.findIndex(
    (o) => o.id === orderId && o.user_id === session.user.id
  );
  if (orderIndex !== -1) {
    runtimeOrders[orderIndex].status = "Đang xử lý";
  }

  // 2. Update in Supabase
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabaseAdmin
        .from("orders")
        .update({ status: "Đang xử lý" })
        .eq("id", orderId)
        .eq("user_id", session.user.id);

      if (error) {
        console.warn("Supabase update status failed:", error.message);
      } else {
        console.log("Order status updated in database:", orderId);
      }
    } catch (err) {
      console.error("Database status update exception:", err);
    }
  }

  return NextResponse.json({
    success: true,
    message: "Order payment confirmed",
  });
}
