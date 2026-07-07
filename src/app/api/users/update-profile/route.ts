import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { runtimeUsers } from "@/data/mockData";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { name, size, shippingAddress } = await req.json();

  console.log("Updating user profile:", {
    userId,
    name,
    size,
    shippingAddress,
  });

  if (!name || !userId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  if (!isSupabaseConfigured) {
    const user = runtimeUsers.find((u) => u.id === userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    user.name = name;
    (user as any).preferred_size = size || null;
    (user as any).shipping_address = shippingAddress
      ? JSON.stringify(shippingAddress)
      : null;
    return NextResponse.json({ message: "User updated successfully" });
  }

  const { error } = await supabaseAdmin
    .from("users")
    .update({
      name,
      preferred_size: size || null,
      shipping_address: shippingAddress
        ? JSON.stringify(shippingAddress)
        : null,
    })
    .eq("id", userId);

  if (error) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { error: "Database update failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "User updated successfully" });
}
