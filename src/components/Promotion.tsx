"use client";
import React from "react";

export default function Promotion() {
    return (
        <div
            className="relative w-full h-64 bg-cover bg-center"
            style={{ backgroundImage: "url(/Carousel2.jpg)" }} // thay đổi đường dẫn ảnh theo ý bạn
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
                <h2 className="text-3xl font-bold mb-2">Big Sale!</h2>
                <p className="text-lg mb-4">Up to 50% off on your favourited items before 01/01/2025</p>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Shop Now</button>
            </div>
        </div>
    );
}
