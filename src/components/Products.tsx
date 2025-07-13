// components/Products.tsx
import { useMemo } from "react";
import ProductCard from "./ProductCard";
import Product from "@/types/Products";

type Props = {
  products: Product[];
  filter: string;
  selectedCategory: string;
};

export default function Products({
  products,
  filter,
  selectedCategory,
}: Props) {
  const filteredProducts = useMemo(() => {
    const filtered =
      selectedCategory === "All"
        ? [...products]
        : products.filter((p) => p.category === selectedCategory);

    switch (filter) {
      case "price-low-high":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return filtered.sort((a, b) => b.price - a.price);
      case "date-newest":
        return filtered.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
        );
      case "date-oldest":
        return filtered.sort(
          (a, b) =>
            new Date(a.releaseDate).getTime() -
            new Date(b.releaseDate).getTime()
        );
      default:
        return filtered;
    }
  }, [products, filter, selectedCategory]);

  return (
    <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
