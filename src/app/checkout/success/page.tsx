// src/app/checkout/success/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-000000";

  return (
    <div className="max-w-xl mx-auto px-4 py-20 min-h-screen flex flex-col justify-center items-center font-sans animate-fade-in text-center select-none">
      {/* Golden Success Check Circle */}
      <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37] mb-6 border border-[#d4af37]/20 shadow-xs">
        <svg
          className="w-8 h-8 animate-fade-in"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>

      <h1 className="font-serif text-3xl md:text-4xl font-normal text-neutral-900 tracking-tight mb-2">
        Order Placed Successfully
      </h1>
      
      <p className="text-neutral-500 text-sm max-w-sm mb-6 leading-relaxed">
        Thank you for shopping with us. Your garment collection is being curated and prepared for delivery.
      </p>

      {/* Invoice details */}
      <div className="w-full bg-[#FAF8F5] border border-[#EAE7E2]/60 rounded-2xl p-4 flex flex-col items-center mb-8">
        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-1">
          Tracking Order ID
        </span>
        <span className="text-sm font-semibold text-neutral-800 font-mono tracking-wide">
          #{orderId}
        </span>
      </div>

      {/* Navigation options */}
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
        <Link
          href="/user/histories"
          className="px-6 py-3 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 rounded-lg transition-all duration-200 shadow-xs"
        >
          View Order History
        </Link>
        <Link
          href="/"
          className="px-6 py-3 bg-white text-neutral-800 border border-neutral-200 text-xs font-semibold uppercase tracking-widest hover:border-neutral-400 hover:text-black rounded-lg transition-all duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-xl mx-auto px-4 py-20 min-h-screen flex flex-col justify-center items-center font-sans text-center">
        <p className="animate-pulse text-sm text-neutral-400">Loading order confirmation...</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
