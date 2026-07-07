// src/app/checkout/momo-mock-gateway/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function MomoMockGatewayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-123456";
  const amount = searchParams.get("amount") || "0";

  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(
            `/checkout/momo-callback?resultCode=0&orderId=${orderId}&amount=${amount}&message=Success`
          );
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router, orderId, amount]);

  return (
    <div className="min-h-screen bg-[#A50064] flex items-center justify-center font-sans text-white p-4">
      <div className="bg-white text-neutral-800 rounded-3xl w-full max-w-md p-6 shadow-2xl flex flex-col items-center select-none animate-fade-in">
        {/* MoMo Header Logo */}
        <div className="w-16 h-16 bg-[#A50064] rounded-2xl flex items-center justify-center text-white font-black text-2xl mb-4 shadow-sm">
          momo
        </div>
        
        <h1 className="text-xl font-bold text-center text-neutral-900 mb-1">
          MoMo Payment Portal
        </h1>
        <p className="text-xs text-neutral-400 mb-6 font-semibold tracking-wider uppercase">
          Sandbox Environment
        </p>

        {/* Amount details */}
        <div className="w-full bg-[#FAF8F5] border border-neutral-100 rounded-2xl p-4 flex flex-col items-center mb-6">
          <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">
            Payment Amount
          </span>
          <span className="text-3xl font-black text-neutral-950 font-sans">
            {Number(amount).toLocaleString()} VND
          </span>
          <span className="text-xs text-neutral-400 font-semibold mt-2 font-mono">
            Ref: {orderId}
          </span>
        </div>

        {/* Spinner Loader */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-[#A50064]/10" />
            <div className="absolute inset-0 rounded-full border-4 border-[#A50064] border-t-transparent animate-spin" />
          </div>
          
          <div className="text-center">
            <p className="text-sm font-semibold text-neutral-700">
              Processing secure payment transaction...
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              Redirecting you back to Dappermen in <span className="font-bold text-[#A50064] font-mono">{counter}s</span>
            </p>
          </div>
        </div>

        {/* Quick redirect skip option */}
        <button
          onClick={() =>
            router.push(
              `/checkout/momo-callback?resultCode=0&orderId=${orderId}&amount=${amount}`
            )
          }
          className="mt-8 text-xs font-semibold text-[#A50064] hover:underline cursor-pointer bg-transparent border-0 outline-none"
        >
          Skip Waiting & Redirect Now
        </button>
      </div>
    </div>
  );
}

export default function MomoMockGateway() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#A50064] flex items-center justify-center font-sans text-white p-4">
        <p className="animate-pulse text-sm font-semibold">Initiating payment portal...</p>
      </div>
    }>
      <MomoMockGatewayContent />
    </Suspense>
  );
}
