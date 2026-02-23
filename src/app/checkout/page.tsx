"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import OrderSummary from "@/components/OrderSummary";
import AddressForm from "@/components/SelectAddress";
import { ShippingAddress } from "@/types/ShippingAddress";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [address, setAddress] = useState<ShippingAddress>({
    details: "",
    street: "",
    province: "",
    ward: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.phone ||
      !address.province ||
      !address.ward ||
      !address.street ||
      !address.details
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Mock API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      toast.success("Order placed successfully!");
      clearCart();
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <Toaster />
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Shipping Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-medium mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium text-sm">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-400 rounded"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium text-sm">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-1 font-medium text-sm">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-400 rounded"
                    placeholder="0912345678"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
            <AddressForm value={address} onChange={setAddress} />
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary items={items} hideCheckoutButton={true} />

          <button
            onClick={handlePlaceOrder}
            disabled={loading || items.length === 0}
            className={`w-full py-3 mt-4 text-white font-medium rounded transition-colors
              ${loading || items.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-700 active:bg-gray-950"}`}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
