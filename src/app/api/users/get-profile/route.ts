import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { runtimeUsers } from "@/data/mockData";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured) {
    const user = runtimeUsers.find((u) => u.id === session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      name: user.name,
      size: (user as any).preferred_size || "",
      shippingAddress: (user as any).shipping_address
        ? JSON.parse((user as any).shipping_address)
        : null,
    });
  }

  const { data, error } = await supabaseAdmin
    .from("users")
    .select("name, preferred_size, shipping_address")
    .eq("id", session.user.id)
    .single();

  if (error) {
    console.error("Profile get failed:", error);
    return NextResponse.json({ error: "Không lấy được user" }, { status: 500 });
  }

  return NextResponse.json({
    name: data.name,
    size: data.preferred_size,
    shippingAddress: data.shipping_address
      ? JSON.parse(data.shipping_address)
      : null,
  });
}
