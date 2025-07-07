import { useState, useMemo } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import Product from "@/types/Products";

// type FilterType = "price-low-high" | "price-high-low" | "date-newest" | "date-oldest";
const products: Product[] = [
    {
        id: 1,
        imageSrc: "/images/product1.png",
        imageAlt: "Product 1",
        name: "Braided fine-knit",
        category: "t-shirt",
        price: 250000,
        releaseDate: "2024-07-01",
    },
    {
        id: 2,
        imageSrc: "/images/product2.png",
        imageAlt: "Product 2",
        name: "Knitted cotton",
        category: "sweater",
        price: 220000,
        releaseDate: "2024-06-15",
    },
    {
        id: 3,
        imageSrc: "/images/product3.png",
        imageAlt: "Product 3",
        name: "Knitted cotton cardigan with buttons",
        category: "cardigan",
        price: 270000,
        releaseDate: "2024-06-25",
    },
    {
        id: 4,
        imageSrc: "/images/product4.png",
        imageAlt: "Product 4",
        name: "Cotton knitted polo shirt",
        category: "polo shirt",
        price: 210000,
        releaseDate: "2024-05-20",
    },
    {
        id: 5,
        imageSrc: "/images/product5.png",
        imageAlt: "Product 5",
        name: "Cotton knitted polo shirt",
        category: "polo shirt",
        price: 230000,
        releaseDate: "2024-07-05",
    },
];

export default function Products() {
    // State cho lựa chọn filter và category
    const [filter, setFilter] = useState<string>(
        "price-low-high"
    );
    const [selectedCategory, setSelectedCategory] =
        useState<string>("All");

    // Định nghĩa danh sách danh mục
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

    // Lọc sản phẩm theo danh mục và sắp xếp theo filter
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
            {/* Truyền mảng danh mục, giá trị category hiện tại và callback xuống Categories */}
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
