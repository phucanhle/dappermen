// src/app/checkout/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

import { useCartStore } from "@/stores/cartStore";
import SelectAddress from "@/components/SelectAddress";
import { Title, Subtitle } from "@/components/UI/Title";
import { LoadingSpin } from "@/components/UI/Loading";

interface ShippingAddress {
  details: string;
  street: string;
  province: string;
  ward: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { items, clearCart } = useCartStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState<ShippingAddress>({
    details: "",
    street: "",
    province: "",
    ward: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"COD" | "MOMO">("COD");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 0; // Free delivery
  const tax = 40000;  // 40k VAT
  const total = subtotal + delivery + tax;

  // Load user profile defaults on load
  useEffect(() => {
    if (status === "unauthenticated") {
      setLoadingProfile(false);
      return;
    }

    if (session?.user) {
      fetch("/api/users/get-profile")
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setName(data.name || session.user.name || "");
            if (data.shippingAddress) {
              setAddress({
                details: data.shippingAddress.details || "",
                street: data.shippingAddress.street || "",
                province: data.shippingAddress.province || "",
                ward: data.shippingAddress.ward || "",
              });
            }
          }
        })
        .catch((err) => console.error("Error loading profile:", err))
        .finally(() => setLoadingProfile(false));
    }
  }, [session, status]);

  // Handle Checkout submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!name || !phone || !address.province || !address.ward) {
      toast.error("Please fill in all shipping details!");
      return;
    }

    setIsSubmitting(true);

    try {
      if (paymentMethod === "COD") {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            address,
            items,
            paymentMethod: "COD",
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Order placement failed");

        toast.success("Order placed successfully!");
        clearCart();
        router.push("/checkout/success?orderId=" + data.orderId);
      } else {
        const loadingToast = toast.loading("Initiating MoMo payment...");
        
        // 1. Create order in Database first
        const createOrderRes = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            phone,
            address,
            items,
            paymentMethod: "MOMO",
          }),
        });

        const orderData = await createOrderRes.json();
        if (!createOrderRes.ok || !orderData.orderId) {
          toast.dismiss(loadingToast);
          throw new Error(orderData.error || "Failed to create order. Please try again.");
        }

        const actualOrderId = orderData.orderId;

        // 2. MoMo payment initiation using actualOrderId
        const momoInitRes = await fetch("/api/checkout/momo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            orderId: actualOrderId,
          }),
        });

        const momoData = await momoInitRes.json();
        toast.dismiss(loadingToast);

        if (!momoInitRes.ok || !momoData.payUrl) {
          throw new Error(momoData.error || "MoMo payment initialization failed");
        }

        if (momoData.payUrl.startsWith("http://") || momoData.payUrl.startsWith("https://")) {
          window.location.href = momoData.payUrl;
        } else {
          router.push(momoData.payUrl);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to process checkout");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || loadingProfile) {
    return (
      <div className="max-w-7xl min-h-screen mx-auto px-4 py-16 flex flex-col justify-center items-center">
        <LoadingSpin />
        <p className="text-center text-neutral-400 font-sans text-sm mt-3">
          Loading checkout credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen font-sans animate-fade-in">
      <Title className="text-left text-3xl font-serif font-light mb-8">Checkout</Title>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Shipping & Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* Shipping Address Section */}
          <div className="bg-white border border-[#EAE7E2]/60 rounded-2xl p-6 shadow-2xs">
            <h2 className="font-serif text-lg font-normal text-neutral-900 border-b border-[#EAE7E2]/50 pb-3 mb-5">
              Shipping Address
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  FullName
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50/30 focus:outline-none focus:border-neutral-500 font-sans"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50/30 focus:outline-none focus:border-neutral-500 font-sans"
                  placeholder="0912345678"
                />
              </div>

              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
                  Address Details
                </label>
                <SelectAddress
                  value={address}
                  onChange={(val) => setAddress(val)}
                />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white border border-[#EAE7E2]/60 rounded-2xl p-6 shadow-2xs">
            <h2 className="font-serif text-lg font-normal text-neutral-900 border-b border-[#EAE7E2]/50 pb-3 mb-5">
              Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* COD Method Card */}
              <div
                onClick={() => setPaymentMethod("COD")}
                className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-200 ${
                  paymentMethod === "COD"
                    ? "border-neutral-950 bg-neutral-50/50 shadow-2xs"
                    : "border-neutral-200 hover:border-neutral-400 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === "COD" ? "border-neutral-950" : "border-neutral-300"
                  }`}>
                    {paymentMethod === "COD" && <div className="w-2 h-2 rounded-full bg-neutral-950" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">Cash on Delivery</p>
                    <p className="text-xs text-neutral-400">Direct payment on delivery</p>
                  </div>
                </div>
              </div>

              {/* MoMo Method Card */}
              <div
                onClick={() => setPaymentMethod("MOMO")}
                className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all duration-200 ${
                  paymentMethod === "MOMO"
                    ? "border-[#A50064] bg-[#A50064]/5 shadow-2xs"
                    : "border-neutral-200 hover:border-neutral-400 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    paymentMethod === "MOMO" ? "border-[#A50064]" : "border-neutral-300"
                  }`}>
                    {paymentMethod === "MOMO" && <div className="w-2 h-2 rounded-full bg-[#A50064]" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">MoMo Wallet</p>
                    <p className="text-xs text-neutral-400">Pay using MoMo test gateway</p>
                  </div>
                </div>
                <div className="w-7 h-7 bg-[#A50064] rounded-md flex items-center justify-center text-white font-extrabold text-[10px] font-sans">
                  momo
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FAF8F5] border border-[#EAE7E2] rounded-2xl p-6 shadow-xs h-fit">
            <h2 className="font-serif text-lg font-normal text-neutral-900 border-b border-[#EAE7E2]/60 pb-3 mb-4">
              Order Items
            </h2>

            <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1 mb-4 divide-y divide-[#EAE7E2]/40">
              {items.map((item) => (
                <div key={item.id + item.size} className="flex justify-between items-center text-xs pt-3 first:pt-0">
                  <div className="flex flex-col">
                    <span className="font-sans font-semibold text-neutral-800 leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 mt-0.5">
                      Size: {item.size} | Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-sans font-semibold text-neutral-800">
                    {(item.price * item.quantity).toLocaleString()} VND
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-[#EAE7E2]/60 pt-4 mb-4 text-xs font-sans">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Delivery Cost</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>VAT Tax (10%)</span>
                <span>{tax.toLocaleString()} VND</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold text-neutral-900 border-t border-[#EAE7E2]/60 pt-4 mb-6">
              <span>TOTAL</span>
              <span className="text-base text-neutral-950 font-bold">
                {total.toLocaleString()} VND
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
            >
              {isSubmitting ? "Processing Order..." : "Confirm & Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
