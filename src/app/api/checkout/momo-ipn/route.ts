// src/app/api/checkout/momo-ipn/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { runtimeOrders } from "@/data/mockData";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received MoMo IPN Webhook:", body);

    const { orderId, resultCode } = body;

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // MoMo resultCode = 0 means success
    const isSuccess = String(resultCode) === "0";

    if (isSuccess) {
      // 1. Update in local memory (mockData fallback)
      const orderIndex = runtimeOrders.findIndex((o) => o.id === orderId);
      if (orderIndex !== -1) {
        runtimeOrders[orderIndex].status = "Đang xử lý";
      }

      // 2. Update in Supabase
      if (isSupabaseConfigured) {
        const { error } = await supabaseAdmin
          .from("orders")
          .update({ status: "Đang xử lý" })
          .eq("id", orderId);

        if (error) {
          console.warn("IPN: Supabase status update failed:", error.message);
        } else {
          console.log("IPN: Order status updated in database:", orderId);
        }
      }
    }

    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("Error processing MoMo IPN:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
