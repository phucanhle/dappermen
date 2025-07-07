"use client";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";

export default function CartPage() {
    const items = useCartStore((s) => s.items);
    const removeItem = useCartStore((s) => s.removeItem);
    const updateQuantity = useCartStore(
        (s) => s.updateQuantity
    );

    return (
        <div className="max-w-[1440px] mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">
                CART
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            {...item}
                            onDelete={() =>
                                removeItem(item.id)
                            }
                            onQuantityChange={(qty) =>
                                updateQuantity(item.id, qty)
                            }
                        />
                    ))}
                </div>
                <OrderSummary items={items} />
            </div>
        </div>
    );
}
