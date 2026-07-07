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
        <div className="w-full my-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-neutral-150 pb-6">
            <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
                <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">Sort products</span>
            </div>

            <div className="relative">
                <select
                    id="product-filter"
                    value={currentFilter}
                    onChange={handleChange}
                    className="appearance-none bg-white border border-neutral-200/80 hover:border-neutral-400 text-neutral-700 font-medium text-xs md:text-sm py-2 pl-4 pr-10 rounded-lg outline-none transition-all cursor-pointer shadow-xs"
                >
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="date-newest">Date: Newest</option>
                    <option value="date-oldest">Date: Oldest</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}
