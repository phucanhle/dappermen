import { useState, useMemo } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import Categories from "./Categories";

interface Product {
    src: string;
    alt: string;
    name: string;
    category: string;
    price: number;
    releaseDate: string;
}

// type FilterType = "price-low-high" | "price-high-low" | "date-newest" | "date-oldest";

export default function Products() {
    // State cho lựa chọn filter và category
    const [filter, setFilter] = useState<string>("price-low-high");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    // Định nghĩa danh sách danh mục
    const categories: string[] = ["All", "t-shirt", "sweater", "cardigan", "polo shirt"];

    const products: Product[] = [
        {
            src: "/images/product1.png",
            alt: "Product 1",
            name: "Braided fine-knit",
            category: "t-shirt",
            price: 250000,
            releaseDate: "2023-05-01",
        },
        {
            src: "/images/product2.png",
            alt: "Product 2",
            name: "Knitted cotton",
            category: "sweater",
            price: 220000,
            releaseDate: "2023-04-15",
        },
        {
            src: "/images/product3.png",
            alt: "Product 3",
            name: "Knitted cotton cardigan with buttons",
            category: "cardigan",
            price: 270000,
            releaseDate: "2023-05-10",
        },
        {
            src: "/images/product4.png",
            alt: "Product 4",
            name: "Cotton knitted polo shirt",
            category: "polo shirt",
            price: 210000,
            releaseDate: "2023-03-20",
        },
        {
            src: "/images/product5.png",
            alt: "Product 5",
            name: "Cotton knitted polo shirt",
            category: "polo shirt",
            price: 230000,
            releaseDate: "2023-05-05",
        },
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
            selectedCategory === "All" ? [...products] : products.filter((product) => product.category === selectedCategory);

        if (filter === "price-low-high") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (filter === "price-high-low") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (filter === "date-newest") {
            filtered.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        } else if (filter === "date-oldest") {
            filtered.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
        }
        return filtered;
    }, [filter, selectedCategory, products]);

    return (
        <div id="products" className="w-full max-w-[1440px] mx-auto p-2 flex flex-col items-center">
            <h1 className="w-full text-center text-4xl font-bold mt-10">Products</h1>
            {/* Truyền mảng danh mục, giá trị category hiện tại và callback xuống Categories */}
            <Categories categories={categories} currentCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
            <Filter currentFilter={filter} onFilterChange={handleFilterChange} />
            <div className="flex justify-around flex-wrap gap-8 md:justify-between">
                {filteredProducts.map((product, index) => (
                    <ProductCard
                        key={index}
                        imageSrc={product.src}
                        imageAlt={product.alt}
                        name={product.name}
                        category={product.category}
                        price={product.price}
                    />
                ))}
            </div>
            <button className="my-10 p-2 w-full text-white text-xl bg-[#383838] cursor-pointer md:w-1/2">See more</button>
        </div>
    );
}
