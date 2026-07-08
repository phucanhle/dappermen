// src/app/checkout/momo-callback/page.tsx
"use client";

import { useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "react-hot-toast";
import { LoadingSpin } from "@/components/UI/Loading";

function MomoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCartStore((s) => s.clearCart);
  
  const hasCalled = useRef(false);

  const resultCode = searchParams.get("resultCode");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    if (resultCode === "0" && orderId) {
      const processOrder = async () => {
        try {
          // Confirm payment on backend
          const res = await fetch("/api/orders/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId,
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Failed to confirm payment");
          }

          clearCart();
          toast.success("Payment completed successfully!");
          
          router.push(`/checkout/success?orderId=${orderId}`);
        } catch (err: any) {
          console.error("Callback order confirm error:", err);
          toast.error("Error saving your payment record.");
          router.push("/checkout");
        }
      };

      processOrder();
    } else {
      toast.error("Payment was cancelled or failed.");
      router.push("/checkout");
    }
  }, [resultCode, orderId, clearCart, router]);

  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 py-24 flex flex-col justify-center items-center font-sans">
      <LoadingSpin />
      <p className="text-center text-neutral-400 font-sans text-sm mt-4 animate-pulse">
        Verifying payment transaction details...
      </p>
    </div>
  );
}

export default function MomoCallbackPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl min-h-screen mx-auto px-4 py-24 flex flex-col justify-center items-center font-sans">
        <LoadingSpin />
        <p className="text-center text-neutral-400 font-sans text-sm mt-4 animate-pulse">
          Loading payment gateway verification...
        </p>
      </div>
    }>
      <MomoCallbackContent />
    </Suspense>
  );
}
