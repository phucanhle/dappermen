import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "@/lib/supabaseClient";

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

  const { error } = await supabase
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
