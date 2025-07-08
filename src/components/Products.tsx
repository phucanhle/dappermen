import { useState, useMemo } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import { products } from "@/data/products";
import Product from "@/types/Products";

export default function Products() {
  const [filter, setFilter] = useState<string>("price-low-high");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories: string[] = [
    "All",
    "t-shirt",
    "sweater",
    "cardigan",
    "polo shirt",
  ];

  const handleFilterChange = (newFilter: string) => setFilter(newFilter);
  const handleCategoryChange = (newCategory: string) =>
    setSelectedCategory(newCategory);

  // Memoized function for filtering and sorting
  const filterAndSortProducts = useMemo(() => {
    return (products: Product[], filter: string, category: string) => {
      // Filter by category
      const filtered =
        category === "All"
          ? [...products]
          : products.filter((product) => product.category === category);

      // Sort by selected filter option
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
    };
  }, []);

  const filteredProducts = filterAndSortProducts(
    products,
    filter,
    selectedCategory
  );

  return (
    <div id="products" className="relative w-full max-w-[1440px] mx-auto p-2 text-center">
      <h1 className="w-full text-center text-4xl font-bold mt-10">Products</h1>
      <Categories
        categories={categories}
        currentCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <Filter currentFilter={filter} onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <button
        className="relative my-10 p-2 w-full text-white text-xl bg-[#383838] cursor-pointer md:w-1/2 "
        aria-label="See more products"
      >
        See more
      </button>
    </div>
  );
}
