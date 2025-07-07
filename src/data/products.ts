// src/data/products.ts

import Product from "@/types/Products";

export const products: Product[] = [
    {
        id: 1,
        imageSrc: "/images/product1.png",
        imageAlt: "Product 1",
        name: "Braided fine-knit",
        category: "t-shirt",
        price: 250000,
        releaseDate: "2023-05-01",
    },
    {
        id: 2,
        imageSrc: "/images/product2.png",
        imageAlt: "Product 2",
        name: "Knitted cotton",
        category: "sweater",
        price: 220000,
        releaseDate: "2023-04-15",
    },
    {
        id: 3,
        imageSrc: "/images/product3.png",
        imageAlt: "Product 3",
        name: "Knitted cotton cardigan with buttons",
        category: "cardigan",
        price: 270000,
        releaseDate: "2023-05-10",
    },
    {
        id: 4,
        imageSrc: "/images/product4.png",
        imageAlt: "Product 4",
        name: "Cotton knitted polo shirt",
        category: "polo shirt",
        price: 210000,
        releaseDate: "2023-03-20",
    },
    {
        id: 5,
        imageSrc: "/images/product5.png",
        imageAlt: "Product 5",
        name: "Cotton knitted polo shirt",
        category: "polo shirt",
        price: 230000,
        releaseDate: "2023-05-05",
    },
];
