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
    <section className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-premium mt-6">
      
      {/* Hình ảnh hiển thị */}
      <div
        className="w-full flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <div key={index} className="w-full shrink-0 relative aspect-21/9 min-h-[300px] md:min-h-[480px]">
            <Image
              src={img.src}
              fill
              priority={index === 0}
              alt={img.alt}
              className="object-cover"
              sizes="100vw"
            />
            {/* Elegant overlay text */}
            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/20 flex flex-col justify-center px-8 md:px-20 text-white">
              <span className="text-xs md:text-sm font-semibold tracking-widest text-[#d4af37] uppercase mb-2 animate-fade-in">
                New Season Arrival
              </span>
              <h2 className="text-2xl md:text-5xl font-bold max-w-md md:max-w-xl leading-tight mb-4 drop-shadow-md">
                {img.alt}
              </h2>
              <p className="text-xs md:text-base text-neutral-200/95 max-w-sm md:max-w-md mb-6 hidden sm:block">
                Discover curated menswear designed for ultimate comfort, styling, and timeless aesthetics.
              </p>
              <div>
                <button 
                  className="px-6 py-2.5 bg-white text-neutral-900 font-semibold text-xs md:text-sm tracking-wider uppercase hover:bg-[#d4af37] hover:text-white transition-all duration-300 rounded-xs shadow-md"
                  onClick={() => {
                    const el = document.getElementById("product-filter");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Shop Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút điều hướng */}
      <button
        aria-label="Previous Slide"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center rounded-full border border-white/20 transition-all duration-200 shadow-md active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        aria-label="Next Slide"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center rounded-full border border-white/20 transition-all duration-200 shadow-md active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? "w-8 h-2 bg-[#d4af37]"
                : "w-2 h-2 bg-white/50 hover:bg-white"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
