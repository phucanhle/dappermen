import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("users")
    .select("name, preferred_size, shipping_address")
    .eq("id", session.user.id)
    .single();

  if (error) {
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
