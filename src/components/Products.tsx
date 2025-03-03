import { useState, useMemo } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

export default function Products() {
    // State lưu lựa chọn filter, mặc định là "price-low-high"
    const [filter, setFilter] = useState("price-low-high");

    const products = [
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

    // Callback để nhận giá trị filter thay đổi từ Filter component
    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    // Tính toán danh sách sản phẩm sau khi áp dụng bộ lọc
    const filteredProducts = useMemo(() => {
        const sorted = [...products];
        if (filter === "price-low-high") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (filter === "price-high-low") {
            sorted.sort((a, b) => b.price - a.price);
        } else if (filter === "date-newest") {
            sorted.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        } else if (filter === "date-oldest") {
            sorted.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
        }
        return sorted;
    }, [filter, products]);

    return (
        <div className="w-full max-w-[1440px] mx-auto p-2 flex flex-col items-center">
            <h1 className="w-full text-center text-4xl font-bold mt-10">Products</h1>
            <Filter currentFilter={filter} onFilterChange={handleFilterChange} />
            <div className="flex justify-around flex-wrap gap-8 md:justify-start">
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
