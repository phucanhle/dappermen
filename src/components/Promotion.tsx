"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./UI/Button";

export default function Promotion() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-72 md:h-80">
        <Image
          src="/Carousel2.jpg"
          alt="Seasonal promotion"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto">
          <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase mb-3 font-sans">
            Limited Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white leading-tight mb-3 max-w-lg">
            Seasonal Favourites
          </h2>
          <p className="text-sm md:text-base text-neutral-200/90 max-w-md mb-6 font-sans leading-relaxed">
            Explore exclusive pieces curated from your wishlist. Premium styles at exceptional value.
          </p>
          <div>
            <Link href="/">
              <Button variant="secondary" size="md" className="bg-white/95 hover:bg-brand-gold hover:text-white hover:border-brand-gold">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

