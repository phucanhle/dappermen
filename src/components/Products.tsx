import { useState, useMemo } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import Categories from "./Categories";

// Mockdata data/products.ts
import { products } from "@/data/products";

export default function Products() {
    const [filter, setFilter] = useState<string>(
        "price-low-high"
    );
    const [selectedCategory, setSelectedCategory] =
        useState<string>("All");

    const categories: string[] = [
        "All",
        "t-shirt",
        "sweater",
        "cardigan",
        "polo shirt",
    ];

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    const handleCategoryChange = (newCategory: string) => {
        setSelectedCategory(newCategory);
    };

    const filteredProducts = useMemo(() => {
        const filtered =
            selectedCategory === "All"
                ? [...products]
                : products.filter(
                      (product) =>
                          product.category ===
                          selectedCategory
                  );

        if (filter === "price-low-high") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (filter === "price-high-low") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (filter === "date-newest") {
            filtered.sort(
                (a, b) =>
                    new Date(b.releaseDate).getTime() -
                    new Date(a.releaseDate).getTime()
            );
        } else if (filter === "date-oldest") {
            filtered.sort(
                (a, b) =>
                    new Date(a.releaseDate).getTime() -
                    new Date(b.releaseDate).getTime()
            );
        }
        return filtered;
    }, [filter, selectedCategory, products]);

    return (
        <div
            id="products"
            className="w-full max-w-[1440px] mx-auto p-2 flex flex-col items-center"
        >
            <h1 className="w-full text-center text-4xl font-bold mt-10">
                Products
            </h1>
            <Categories
                categories={categories}
                currentCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            <Filter
                currentFilter={filter}
                onFilterChange={handleFilterChange}
            />
            <div className="flex justify-around flex-wrap gap-8 md:justify-between">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        imageSrc={product.imageSrc}
                        imageAlt={product.imageAlt}
                        name={product.name}
                        category={product.category}
                        price={product.price}
                        releaseDate={product.releaseDate}
                    />
                ))}
            </div>
            <button className="my-10 p-2 w-full text-white text-xl bg-[#383838] cursor-pointer md:w-1/2">
                See more
            </button>
        </div>
    );
}
