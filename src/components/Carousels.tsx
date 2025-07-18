"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  {
    src: "/Carousel1.jpg",
    alt: "Stylish leather jacket",
  },
  { src: "/Carousel2.jpg", alt: "Casual denim jeans" },
  {
    src: "/Carousel3.jpg",
    alt: "Classic white sneakers",
  },
];

export default function Carousels() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return <p>No images</p>;

  return (
    <section className="relative max-h-[550px] mx-auto max-w-screen-xl overflow-hidden">
      {/* Hình ảnh hiển thị */}
      <div
        className="relative w-full flex transition-transform duration-500 ease-in-out "
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            src={img.src}
            width={1440}
            height={700}
            alt={img.alt}
            className={`object-cover transition-opacity duration-500 ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        aria-label="Previous Slide"
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full"
      >
        ❮
      </button>
      <button
        aria-label="Next Slide"
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full"
      >
        ❯
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "w-5 h-3 bg-yellow-500"
                : "w-3 h-3 bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
