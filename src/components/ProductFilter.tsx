import { useState, useEffect } from "react";
import Categories from "./Categories";
import Filter from "./Filter";

type Props = {
  currentCategory?: string;
  currentFilter?: string;
  onCategoryChange: (c: string) => void;
  onFilterChange: (f: string) => void;
};

export default function ProductFilter({
  currentCategory = "All",
  currentFilter = "price-low-high",
  onCategoryChange,
  onFilterChange,
}: Props) {
  const [selectedFilter, setSelectedFilter] = useState(currentFilter);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  const categories: string[] = [
    "All",
    "t-shirt",
    "sweater",
    "cardigan",
    "polo shirt",
  ];

  // Đồng bộ props → state
  useEffect(() => {
    setSelectedCategory(currentCategory);
  }, [currentCategory]);

  useEffect(() => {
    setSelectedFilter(currentFilter);
  }, [currentFilter]);

  const handleFilter = (newFilter: string) => {
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
  };

  const handleCategory = (newCategory: string) => {
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory);
  };

  return (
    <div className="w-full max-w-screen-xl px-4 mx-auto text-center">
      <Categories
        categories={categories}
        currentCategory={selectedCategory}
        onCategoryChange={handleCategory}
      />
      <Filter currentFilter={selectedFilter} onFilterChange={handleFilter} />
    </div>
  );
}
