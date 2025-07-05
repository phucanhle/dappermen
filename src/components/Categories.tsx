import React from "react";

interface CategoriesProps {
    categories: string[];
    currentCategory: string;
    onCategoryChange: (newCategory: string) => void;
}

export default function Categories({ categories, currentCategory, onCategoryChange }: CategoriesProps) {
    return (
        <div className="flex gap-4 w-full mt-4">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`cursor-pointer p-2 border  capitalize text-sm text-nowrap md:text-base  ${
                        currentCategory === category ? "bg-gray-300" : "bg-white"
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
