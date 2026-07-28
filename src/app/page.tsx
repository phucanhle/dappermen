// app/page.tsx
import type { Metadata } from "next";
import Carousels from "@/components/Carousels";
import ProductWrapper from "@/components/ProductWrapper";

export const metadata: Metadata = {
  title: "Dappermen | Thời trang nam cao cấp & Lookbook",
  description:
    "Khám phá bộ sưu tập thời trang nam thiết kế cao cấp và lookbook nam lịch lãm tại Dappermen. Mua sắm áo sơ mi, quần tây âu, giày da và phụ kiện nam cao cấp tại Hà Nội & TPHCM.",
  alternates: {
    canonical: "https://dappermen.vercel.app",
  },
  openGraph: {
    title: "Dappermen | Thời trang nam cao cấp & Lookbook",
    description:
      "Khám phá bộ sưu tập thời trang nam thiết kế cao cấp và lookbook nam lịch lãm tại Dappermen. Mua sắm áo sơ mi, quần tây âu, giày da và phụ kiện nam cao cấp.",
    url: "https://dappermen.vercel.app",
    images: [
      {
        url: "/Carousel1.jpg",
        width: 1200,
        height: 630,
        alt: "Dappermen - Thời trang nam cao cấp & Lookbook",
      },
    ],
  },
};

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
