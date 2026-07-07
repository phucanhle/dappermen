import React from "react";

interface CategoriesProps {
    categories: string[];
    currentCategory: string;
    onCategoryChange: (newCategory: string) => void;
}

export default function Categories({ categories, currentCategory, onCategoryChange }: CategoriesProps) {
    return (
        <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 justify-start md:justify-center w-full mt-6 scrollbar-none">
            {categories.map((category) => {
                const isActive = currentCategory.toLowerCase() === category.toLowerCase();
                return (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`cursor-pointer px-5 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide capitalize whitespace-nowrap transition-all duration-300 ${
                            isActive 
                                ? "bg-neutral-950 text-white border border-neutral-950 shadow-sm scale-[1.02]" 
                                : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-900"
                        }`}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
}
