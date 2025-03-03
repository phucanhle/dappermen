import { ChangeEvent } from "react";

interface FillterProps {
    currentFilter: string;
    onFilterChange: (newFilter: string) => void;
}

export default function Fillter({ currentFilter, onFilterChange }: FillterProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value);
    };

    return (
        <div className="w-full my-10 flex justify-end items-center">
            <select
                id="product-filter"
                value={currentFilter}
                onChange={handleChange}
                className="py-2 px-6 bg-[#ebebeb] outline-none"
            >
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="date-newest">Date: Newest</option>
                <option value="date-oldest">Date: Oldest</option>
            </select>
        </div>
    );
}
