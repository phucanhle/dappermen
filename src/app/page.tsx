"use client";
import Carousels from "@/components/Carousels";
import { Title } from "@/components/UI/Title";
import ProductWrapper from "@/components/ProductWrapper";

export default function Home() {
  return (
    <div className="space-y-12">
      <Carousels />
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-serif font-light text-neutral-900 tracking-tight leading-tight">
            Curated Collection
          </h2>
          <p className="text-neutral-500 font-sans text-sm md:text-base mt-3 leading-relaxed">
            Discover a sophisticated range of men&apos;s clothing designed with absolute precision. Combining structured cuts with natural tones to curate your lookbook.
          </p>
        </div>
      </div>
      <ProductWrapper />
    </div>
  );
}
