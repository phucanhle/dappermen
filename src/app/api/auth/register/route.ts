import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  console.log("Registering user:", { email, password, name });
  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // 1. Kiểm tra user đã tồn tại
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  console.log("Existing user:", existingUser, "Fetch error:", fetchError);

  if (fetchError && fetchError.code !== "PGRST116") {
    // Lỗi truy vấn khác ngoài không tìm thấy (PGRST116 là not found)
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // 2. Hash mật khẩu
  const hashedPassword = await hash(password, 12);

  // 3. Lưu user mới vào DB
  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert([
      {
        email,
        password: hashedPassword, // lưu trường này trong bảng user
        name,
      },
    ]);

  if (insertError) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}
