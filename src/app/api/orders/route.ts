// src/app/api/orders/route.ts
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

  const userId = session.user.id;
  const { name, phone, address, items, paymentMethod, paymentId } = await req.json();

  if (!name || !phone || !address || !items || items.length === 0) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const subtotal = items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  const delivery = 0; // Free delivery
  const tax = 40000;  // 40k VAT
  const total = subtotal + delivery + tax;

  const initialStatus = paymentMethod === "MOMO" ? "Chờ thanh toán" : "Đang xử lý";

  const orderData = {
    id: orderId,
    user_id: userId,
    date: new Date().toISOString(),
    status: initialStatus,
    total,
    payment_method: paymentMethod || "COD",
    shipping_name: name,
    shipping_phone: phone,
    shipping_address: typeof address === "string" ? address : JSON.stringify(address),
    items: items.map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
  };

  // Push to local memory first as a baseline
  runtimeOrders.push(orderData);

  if (isSupabaseConfigured) {
    try {
      // 1. Insert order record into the database
      const { error: orderError } = await supabaseAdmin.from("orders").insert([
        {
          id: orderId,
          user_id: userId,
          status: initialStatus,
          total,
          payment_method: paymentMethod || "COD",
          shipping_name: name,
          shipping_phone: phone,
          shipping_address: typeof address === "string" ? address : JSON.stringify(address),
          payment_id: paymentId || null,
        },
      ]);

      if (orderError) {
        console.warn("Supabase orders insert failed, saved to local memory fallback:", orderError.message);
      } else {
        // 2. Insert items into order_items table
        const orderItemsToInsert = items.map((item: any) => ({
          order_id: orderId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        }));

        const { error: itemsError } = await supabaseAdmin.from("order_items").insert(orderItemsToInsert);
        if (itemsError) {
          console.warn("Supabase order_items insert failed:", itemsError.message);
        } else {
          console.log("Order saved to database successfully:", orderId);
        }
      }
    } catch (err) {
      console.error("Database order insertion exception, falling back to memory:", err);
    }
  }

  return NextResponse.json({
    success: true,
    message: "Order placed successfully",
    orderId,
  });
}
