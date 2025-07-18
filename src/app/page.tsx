"use client";
import Carousels from "@/components/Carousels";
import { Title } from "@/components/UI/Title";
import ProductWrapper from "@/components/ProductWrapper";

export default function Home() {
  return (
    <div>
      <Carousels />
      <Title className="text-center text-3xl">Products Featured</Title>
      <ProductWrapper />
    </div>
  );
}
