"use client";

import { useEffect, useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/products/${productId}/reviews`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Vui lòng viết bình luận!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gửi đánh giá thất bại.");
      }

      toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
      setComment("");
      setRating(5);
      fetchReviews();
    } catch (err: any) {
      toast.error(err.message || "Lỗi khi gửi đánh giá.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 animate-fade-in font-sans">
      <h2 className="font-serif text-2xl font-normal text-neutral-900 mb-6 border-b border-[#EAE7E2]/60 pb-3">
        Customer Reviews ({reviews.length})
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Reviews List */}
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
            <div className="space-y-6">
              {[1, 2].map((idx) => (
                <div key={idx} className="space-y-3 animate-pulse pt-5 first:pt-0 pb-2">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-neutral-100 rounded w-1/4" />
                    <div className="h-3 bg-neutral-100 rounded w-1/6" />
                  </div>
                  <div className="h-4 bg-neutral-100 rounded w-full" />
                  <div className="h-4 bg-neutral-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-neutral-400 italic">Chưa có đánh giá nào cho sản phẩm này.</p>
          ) : (
            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 divide-y divide-[#EAE7E2]/40">
              {reviews.map((rev, i) => (
                <div key={rev.id || i} className="pt-5 first:pt-0 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-neutral-800">
                        {rev.user_name}
                      </span>
                      {/* Rating Stars */}
                      <div className="flex text-[#d4af37]">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <svg
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < rev.rating ? "fill-[#d4af37] text-[#d4af37]" : "fill-neutral-200 text-neutral-200"
                            }`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-[11px] text-neutral-400">
                      {new Date(rev.created_at).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed mt-2 pl-0">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Write a Review Form */}
        <div className="lg:col-span-5">
          <div className="bg-[#FAF8F5] border border-[#EAE7E2] rounded-2xl p-6 shadow-2xs">
            <h3 className="font-serif text-lg font-normal text-neutral-900 mb-4">
              Write a Review
            </h3>

            {session ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Star Rating Select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    Your Rating
                  </label>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const starValue = idx + 1;
                      const isGold = hoverRating !== null ? starValue <= hoverRating : starValue <= rating;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="focus:outline-none transition-transform active:scale-90"
                          aria-label={`Rate ${starValue} out of 5 stars`}
                        >
                          <svg
                            className={`w-7 h-7 cursor-pointer ${
                              isGold ? "fill-[#d4af37] text-[#d4af37]" : "fill-neutral-200 text-neutral-200"
                            }`}
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Comment Input */}
                <div>
                  <label htmlFor="review-comment" className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    Review Comment
                  </label>
                  <textarea
                    id="review-comment"
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you think about this product..."
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:border-neutral-500 font-sans"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 rounded-lg disabled:opacity-40 shadow-xs cursor-pointer"
                >
                  {submitting ? "Sending..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-neutral-500 mb-4 font-sans">
                  Bạn cần đăng nhập để viết đánh giá cho sản phẩm này.
                </p>
                <a
                  href="/login"
                  className="inline-block px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-sans text-xs font-semibold uppercase tracking-widest transition-all rounded-lg"
                >
                  Đăng Nhập Ngay
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
