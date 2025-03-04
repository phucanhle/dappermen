"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

export default function ProductDetailPage() {
    const { id } = useParams();
    // Giá sản phẩm (tạm thời hard-code)
    const price = 200000; // 200.000 VND

    const [selectedSize, setSelectedSize] =
        useState<string>("M");
    const [quantity, setQuantity] = useState(1);

    // Tăng/giảm số lượng
    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    return (
        <div className="max-w-[1130px] mx-auto px-4 py-8 flex flex-col gap-10">
            <div className="flex flex-wrap w-full justify-around gap-10 md:justify-between">
                {/* Image */}
                <div className=" items-center justify-center">
                    <Image
                        src="/images/product1.png"
                        alt="Product 1"
                        width={320}
                        height={430}
                        className="object-cover"
                    />
                </div>

                {/* Cột phải: thông tin chi tiết */}
                <div className="flex-1 w-full flex flex-col bg-[#ebebeb] px-10 py-5">
                    <p className="text-sm text-gray-600 mb-4">
                        Mã sản phẩm (ID): {id}
                    </p>
                    <h1 className="text-2xl font-bold mb-2">
                        BASIC RELAXED-FIT COTTON T-SHIRT
                    </h1>
                    <p className="text-xl text-gray-700 mb-2">
                        {price.toLocaleString("vi-VN")} VND
                    </p>

                    {/* Chọn size */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">
                            Size:
                        </h3>
                        <div className="flex gap-2">
                            {[
                                "S",
                                "M",
                                "L",
                                "XL",
                                "XXL",
                            ].map((size) => (
                                <button
                                    key={size}
                                    onClick={() =>
                                        setSelectedSize(
                                            size
                                        )
                                    }
                                    className={`px-3 py-1 border rounded ${
                                        selectedSize ===
                                        size
                                            ? "bg-black text-white"
                                            : "bg-white text-black"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chọn số lượng */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">
                            Quantity:
                        </h3>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleDecrease}
                                className="px-3 py-1 border rounded"
                            >
                                -
                            </button>
                            <span className="px-3">
                                {quantity}
                            </span>
                            <button
                                onClick={handleIncrease}
                                className="px-3 py-1 border rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Hiển thị tổng giá dựa trên số lượng */}
                    <p className="text-xl text-gray-700 mb-4">
                        TOTAL:{" "}
                        {(quantity * price).toLocaleString(
                            "vi-VN"
                        )}{" "}
                        VND
                    </p>

                    {/* Nút Add to Cart */}
                    <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
                        ADD TO CART
                    </button>
                </div>
            </div>

            {/* Mô tả sản phẩm (Overview) */}
            <div className="bg-[#ebebeb] p-10 py-5">
                <h2 className="text-lg font-semibold mb-2">
                    Product Overview
                </h2>
                <p className="text-sm text-gray-700 leading-6">
                    Relaxed fit. Cotton fabric. Medium
                    weight cotton fabric. Straight and
                    loose-fitting. Ribbed round neck.
                    Short-sleeve. ...
                </p>
            </div>
            {/* Phần đánh giá (Reviews) */}
            <div className="bg-[#ebebeb] p-10 py-5">
                <h2 className="text-lg font-semibold mb-4">
                    Customer Reviews
                </h2>

                {/* Review 1 */}
                <div className="mb-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">
                            Ryan
                        </span>
                        <div className="flex text-yellow-500">
                            {[1, 2, 3, 4].map((star) => (
                                <AiFillStar key={star} />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 ml-6">
                        Cotton is very cool. But, ...
                    </p>
                </div>

                {/* Review 2 */}
                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">
                            Adam
                        </span>
                        <div className="flex text-yellow-500">
                            {[1, 2, 3].map((star) => (
                                <AiFillStar key={star} />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 ml-6">
                        Cotton is very cool. But, ...
                    </p>
                </div>
            </div>
        </div>
    );
}
