import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Check if the user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  // Return error if there's a database issue (excluding "not found" case)
  if (fetchError && fetchError.code !== "PGRST116") {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash the password before storing
  const hashedPassword = await hash(password, 12);

  // Insert the new user into the database
  const { error: insertError } = await supabase.from("users").insert([
    {
      email,
      password: hashedPassword,
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
