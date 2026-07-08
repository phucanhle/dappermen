// src/app/api/admin/analytics/route.ts
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
    const totalOrders = runtimeOrders.length;
    const totalRevenue = runtimeOrders
      .filter((o) => o.status === "Đã giao")
      .reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = runtimeOrders.filter(
      (o) => o.status === "Chờ thanh toán" || o.status === "Đang xử lý"
    ).length;

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        pendingOrders,
      },
    });
  }

  // 2. Query from Supabase
  try {
    const { data: dbOrders, error } = await supabaseAdmin
      .from("orders")
      .select("status, total");

    if (error) {
      throw error;
    }

    const orders = dbOrders || [];
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((o) => o.status === "Đã giao")
      .reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter(
      (o) => o.status === "Chờ thanh toán" || o.status === "Đang xử lý"
    ).length;

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        pendingOrders,
      },
    });
  } catch (err: any) {
    console.error("Analytics fetch failed:", err);
    return NextResponse.json({ error: err.message || "Failed to load analytics" }, { status: 500 });
  }
}
