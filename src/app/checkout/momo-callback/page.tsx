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
          const cached = localStorage.getItem("dappermen_checkout_cache");
          if (!cached) {
            console.warn("No cached checkout data found. Directing to histories.");
            clearCart();
            router.push("/user/histories");
            return;
          }

          const { name, phone, address, items } = JSON.parse(cached);

          // Submit the order records to database
          const res = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              phone,
              address,
              items,
              paymentMethod: "MOMO",
              paymentId: orderId,
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Failed to save order");
          }

          localStorage.removeItem("dappermen_checkout_cache");
          clearCart();
          toast.success("Payment completed successfully!");
          
          router.push(`/checkout/success?orderId=${orderId}`);
        } catch (err: any) {
          console.error("Callback order save error:", err);
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
