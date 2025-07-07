// src/components/OrderSummary.tsx
import { cartItem } from "@/types/CartItem";

type Props = {
    items: cartItem[]; // 👈 mảng sản phẩm giỏ hàng
    delivery?: number; // 👈 optional, mặc định = 0
};

export default function OrderSummary({
    items,
    delivery = 0,
}: Props) {
    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const tax = 40000; // ví dụ 40k VAT
    const total = subtotal + delivery + tax;

    return (
        <div className="border border-gray-300 p-4 h-fit max-w-[400px]">
            <h2 className="text-lg font-semibold mb-4">
                ORDER SUMMARY
            </h2>

            {/* Danh sách sản phẩm */}
            <div className="mb-4 space-y-1 text-sm">
                {items.map((item) => (
                    <div
                        key={item.id + item.size}
                        className="flex justify-between"
                    >
                        <p>
                            {item.name} x {item.quantity}
                        </p>
                        <p>
                            {(
                                item.price * item.quantity
                            ).toLocaleString()}{" "}
                            VND
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mb-2 text-sm text-gray-700">
                <p>Delivery</p>
                <p>
                    {delivery === 0
                        ? "FREE"
                        : `${delivery.toLocaleString()} VND`}
                </p>
            </div>

            <div className="flex justify-between mb-2 text-sm text-gray-700">
                <p>Included 10% VAT</p>
                <p>{tax.toLocaleString()} VND</p>
            </div>

            <div className="flex justify-between my-2 font-semibold">
                <p>TOTAL</p>
                <p>{total.toLocaleString()} VND</p>
            </div>

            <button className="w-full bg-gray-800 text-white py-2 mt-4 hover:bg-gray-700 active:bg-gray-950 transition-colors cursor-pointer ">
                CHECK OUT
            </button>
        </div>
    );
}
