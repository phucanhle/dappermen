"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import SizeGuide from "@/components/SizeGuide";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage() {
    const { id } = useParams();

    const price = 200000;

    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [quantity, setQuantity] = useState(1);

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
                    <Image src="/images/product1.png" alt="Product 1" width={320} height={430} className="object-cover" />
                </div>

                {/* Information */}
                <div className="flex-1 w-full flex flex-col bg-[#ebebeb] px-10 py-5">
                    <p className="text-sm text-gray-600 mb-4">Mã sản phẩm (ID): {id}</p>
                    <h1 className="text-2xl font-bold mb-2">BASIC RELAXED-FIT COTTON T-SHIRT</h1>
                    <p className="text-xl text-gray-700 mb-2">{price.toLocaleString("vi-VN")} VND</p>

                    {/* size */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Size:</h3>
                        <div className="flex gap-2">
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-10 border aspect-square cursor-pointer ${
                                        selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Quantity:</h3>
                        <div className="flex items-center gap-2">
                            <button onClick={handleDecrease} className="px-3 py-1 border bg-white cursor-pointer ">
                                -
                            </button>
                            <span className="px-3">{quantity}</span>
                            <button onClick={handleIncrease} className="px-3 py-1 border bg-white cursor-pointer ">
                                +
                            </button>
                        </div>
                    </div>

                    {/* Total price */}
                    <p className="text-xl text-gray-700 mb-4">TOTAL: {(quantity * price).toLocaleString("vi-VN")} VND</p>

                    {/* Add to Cart */}
                    <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">ADD TO CART</button>
                </div>
            </div>

            {/* Overview */}
            <div className="bg-[#ebebeb] p-10 py-5">
                <h2 className="text-2xl font-bold mb-4">Product Overview</h2>
                <div className="w-full">
                    <div className="flex flex-wrap gap-4 md:flex-nowrap">
                        <Image
                            src="/images/product1.png"
                            alt="Product 1"
                            width={1300}
                            height={1300}
                            className="object-cover w-full max-w-2xl"
                        />

                        <p className="text-sm text-gray-700 leading-6 w-full md:w-1/2">
                            Relaxed fit. Cotton fabric. Medium weight cotton fabric. Relaxed fit: straight and loose-fitting
                            silhouette for comfort . Medium weight cotton, between 145 and 165 g/m2, providing flexibility and
                            strength.. Rounded neck. Short sleeve. The model is wearing a size M. Basics Collection. The model is
                            183 cm and is wearing a size M. Antoine Griezmann Campaign.Relaxed fit. Cotton fabric. Medium weight
                            cotton fabric. Relaxed fit: straight and loose-fitting silhouette for comfort . Medium weight cotton,
                            between 145 and 165 g/m2, providing flexibility and strength.. Rounded neck. Short sleeve. The model
                            is wearing a size M. Basics Collection. The model is 183 cm and is wearing a size M. Antoine Griezmann
                            Campaign.
                        </p>
                    </div>
                    <div className="flex justify-between gap-4  mt-2 flex-wrap md:flex-nowrap">
                        <Image src="/images/product1.png" alt="Product 1" width={1300} height={1300} className="max-w-1/2" />
                        <Image src="/images/product1.png" alt="Product 1" width={1300} height={1300} className=" max-w-1/2" />
                    </div>
                </div>
                <SizeGuide />
            </div>
            {/* Reviews */}
            <div className="bg-[#ebebeb] p-10 py-5">
                <h2 className="text-lg font-bold mb-4">Customer Reviews</h2>

                {/* Review 1 */}
                <div className="mb-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Ryan</span>
                        <div className="flex text-yellow-500">
                            {[1, 2, 3, 4].map((star) => (
                                <AiFillStar key={star} />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 ml-6">Cotton is very cool. But, ...</p>
                </div>

                {/* Review 2 */}
                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">Adam</span>
                        <div className="flex text-yellow-500">
                            {[1, 2, 3].map((star) => (
                                <AiFillStar key={star} />
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-gray-700 ml-6">Cotton is very cool. But, ...</p>
                </div>
            </div>

            {/* Related */}
            {/* Related */}
            <div className="bg-[#ebebeb] p-10 py-5">
                <h2 className="text-lg font-bold mb-4">Related products</h2>
                <div className="overflow-x-auto">
                    <div className="flex gap-4" style={{ minWidth: "900px" }}>
                        <div className="flex-none w-[320px]">
                            <ProductCard
                                name="BASIC RELAXED-FIT COTTON T-SHIRT"
                                price={200000}
                                imageSrc="/images/product1.png"
                                imageAlt="1"
                                category="T-shirt"
                            />
                        </div>
                        <div className="flex-none w-[320px]">
                            <ProductCard
                                name="BASIC RELAXED-FIT COTTON T-SHIRT"
                                price={200000}
                                imageSrc="/images/product1.png"
                                imageAlt="1"
                                category="T-shirt"
                            />
                        </div>
                        <div className="flex-none w-[320px]">
                            <ProductCard
                                name="BASIC RELAXED-FIT COTTON T-SHIRT"
                                price={200000}
                                imageSrc="/images/product1.png"
                                imageAlt="1"
                                category="T-shirt"
                            />
                        </div>{" "}
                        <div className="flex-none w-[320px]">
                            <ProductCard
                                name="BASIC RELAXED-FIT COTTON T-SHIRT"
                                price={200000}
                                imageSrc="/images/product1.png"
                                imageAlt="1"
                                category="T-shirt"
                            />
                        </div>
                        {/* Bạn có thể thêm các ProductCard khác ở đây (logic map) */}
                    </div>
                </div>
            </div>
        </div>
    );
}
