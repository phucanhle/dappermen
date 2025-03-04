"use client";
import { useState } from "react";
import CartItem from "@/components/CartItem";
// Kiểu dữ liệu cho từng sản phẩm
type CartItemProps = {
    id: number;
    imageSrc: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    onDelete?: () => void;
    onQuantityChange?: (qty: number) => void;
};

export default function CartPage() {
    // Dữ liệu ví dụ cho giỏ hàng
    const [cartItems, setCartItems] = useState<CartItemProps[]>([
        {
            id: 1,
            imageSrc: "/images/product2.png",
            name: "BASIC RELAXED-FIT COTTON T-SHIRT",
            price: 200000,
            size: "L",
            quantity: 1,
        },
        {
            id: 2,
            imageSrc: "/images/product1.png",
            name: "ADIDAS SAMBA OG SHOES",
            price: 200000,
            size: "42",
            quantity: 1,
        },
    ]);

    // Tính toán tổng giá trị
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const delivery = 0; // ví dụ là miễn phí
    const total = subtotal + delivery + 40000; // ví dụ tính thêm thuế 40.000

    // Hàm xóa sản phẩm khỏi giỏ
    const handleDeleteItem = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Hàm cập nhật số lượng
    const handleChangeQuantity = (id: number, newQty: number) => {
        setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
    };

    return (
        <div className="max-w-[1440px] mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">CART</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Vùng hiển thị các sản phẩm trong giỏ */}
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            {...item}
                            onDelete={() => handleDeleteItem(item.id)}
                            onQuantityChange={(qty: number) => handleChangeQuantity(item.id, qty)}
                        />
                    ))}
                </div>

                {/* Vùng hiển thị tóm tắt đơn hàng */}
                <OrderSummary itemsCount={cartItems.length} subtotal={subtotal} delivery={delivery} total={total} />
            </div>
        </div>
    );
}

// Kiểu dữ liệu cho tóm tắt đơn hàng
type OrderSummaryProps = {
    itemsCount: number;
    subtotal: number;
    delivery: number;
    total: number;
};

// Component hiển thị tóm tắt đơn hàng
function OrderSummary({ itemsCount, subtotal, delivery, total }: OrderSummaryProps) {
    return (
        <div className="border p-4 h-fit max-w-[400px]">
            <h2 className="text-lg font-semibold mb-4">ORDER SUMMARY</h2>
            <div className="flex justify-between mb-2">
                <p>{itemsCount} items</p>
                <p>{subtotal.toLocaleString()} VND</p>
            </div>
            <div className="flex justify-between mb-2">
                <p>Delivery</p>
                <p>{delivery === 0 ? "FREE" : `${delivery.toLocaleString()} VND`}</p>
            </div>
            <div className="flex justify-between mb-2 font-semibold">
                <p>TOTAL</p>
                <p>{total.toLocaleString()} VND</p>
            </div>
            <p>Included 10% VAT</p>
            <button className="w-full bg-black text-white py-2 mt-4 hover:bg-gray-800 transition-colors">CHECK OUT</button>
        </div>
    );
}
