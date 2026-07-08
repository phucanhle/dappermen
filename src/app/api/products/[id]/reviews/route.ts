// src/app/api/products/[id]/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseClient";
import { runtimeReviews } from "@/data/mockData";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (Number.isNaN(productId)) {
    return NextResponse.json({ error: "Product ID không hợp lệ" }, { status: 400 });
  }

  // 1. Fallback if Supabase is not configured
  if (!isSupabaseConfigured) {
    const reviews = runtimeReviews.filter((r) => r.product_id === productId);
    reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return NextResponse.json({ success: true, reviews });
  }

  // 2. Query from Supabase
  try {
    const { data: dbReviews, error } = await supabaseAdmin
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase reviews table error, falling back to local memory:", error.message);
      const reviews = runtimeReviews.filter((r) => r.product_id === productId);
      reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return NextResponse.json({ success: true, reviews });
    }

    return NextResponse.json({ success: true, reviews: dbReviews || [] });
  } catch (err) {
    console.error("Fetch reviews exception, falling back:", err);
    const reviews = runtimeReviews.filter((r) => r.product_id === productId);
    reviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return NextResponse.json({ success: true, reviews });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Bạn cần đăng nhập để đánh giá sản phẩm." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const productId = parseInt(id, 10);

  if (Number.isNaN(productId)) {
    return NextResponse.json({ error: "Product ID không hợp lệ" }, { status: 400 });
  }

  try {
    const { rating, comment } = await request.json();

    const ratingNum = parseInt(rating, 10);
    if (Number.isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: "Điểm đánh giá phải từ 1 đến 5 sao." }, { status: 400 });
    }

    if (!comment || comment.trim().length === 0) {
      return NextResponse.json({ error: "Vui lòng nhập nội dung nhận xét." }, { status: 400 });
    }

    const reviewId = "REV-" + Math.floor(100000 + Math.random() * 900000);
    const userName = session.user.name || "Khách hàng";
    const userId = session.user.id;
    const createdAt = new Date().toISOString();

    const newReview = {
      id: reviewId,
      product_id: productId,
      user_id: userId,
      user_name: userName,
      rating: ratingNum,
      comment: comment.trim(),
      created_at: createdAt,
    };

    // 1. Save in local memory
    runtimeReviews.push(newReview);

    // 2. Save in Supabase
    if (isSupabaseConfigured) {
      const { error } = await supabaseAdmin.from("reviews").insert([
        {
          id: reviewId,
          product_id: productId,
          user_id: userId,
          user_name: userName,
          rating: ratingNum,
          comment: comment.trim(),
        },
      ]);

      if (error) {
        console.warn("Supabase reviews insert failed, fallback to local memory:", error.message);
      } else {
        console.log("Review saved to database successfully:", reviewId);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Đánh giá của bạn đã được ghi nhận.",
      review: newReview,
    });
  } catch (err) {
    console.error("Save review exception:", err);
    return NextResponse.json({ error: "Không thể gửi đánh giá." }, { status: 500 });
  }
}
