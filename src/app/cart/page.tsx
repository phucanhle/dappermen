"use client";
import { useCartStore } from "@/stores/cartStore";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { Title } from "@/components/UI/Title";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
      <Title>Cart</Title>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <CartItem
              key={item.id + item.size}
              {...item}
              onDelete={() => removeItem(item.id, item.size)}
              onQuantityChange={(qty) => updateQuantity(item.id, item.size, qty)}
            />
          ))}
        </div>
        <OrderSummary items={items} />
      </div>
    </div>
  );
}
