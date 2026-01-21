"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { useCartStore } from "@/stores/cartStore";
import UserMenu from "./UserMenu";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const handleSearching = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="w-full h-20 bg-white border-b shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <Logo />

        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <ul className="hidden md:flex items-center gap-3">
          {/* Search */}
          <li className="flex items-center bg-[#EBEBEB] p-2">
            <SearchBar
              open={openSearch}
              query={query}
              onChange={handleSearching}
              onSubmit={handleSearchSubmit}
              onClose={() => setOpenSearch(false)}
              onOpen={() => setOpenSearch(true)} // chạy được nè
              inputRef={searchRef}
            />
          </li>

          {/* Favourites */}
          <li className="bg-[#EBEBEB] p-2">
            <Link href="/favourites">
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
            </Link>
          </li>

          {/* Cart */}
          <li className="bg-[#EBEBEB] p-2 relative">
            <Link href="/cart">
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 4h1.5L9 16h8m-8 0a2 2 0 100 4 2 2 0 000-4Zm8 0a2 2 0 100 4 2 2 0 000-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-400 w-4 h-4 text-center rounded-full text-white text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>

          <UserMenu />
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen &&
        MobileMenu(
          query,
          handleSearching,
          handleSearchSubmit,
          setIsMobileMenuOpen
        )}
    </header>
  );
}
