"use client";
import { useState, useRef, useEffect } from "react";
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

  useEffect(() => {
    if (typeof navigator !== "undefined" && "modelContext" in navigator) {
      const modelContext = (navigator as any).modelContext;
      if (modelContext && typeof modelContext.registerTool === "function") {
        try {
          modelContext.registerTool({
            name: "searchProducts",
            description: "Search Dappermen apparel catalog by keyword",
            inputSchema: {
              type: "object",
              properties: {
                query: { type: "string", description: "Search query or category name" }
              },
              required: ["query"]
            },
            execute: async ({ query }: { query: string }) => {
              router.push(`/search?query=${encodeURIComponent(query)}`);
              return { success: true, query };
            }
          });
        } catch (err) {
          console.error("Failed to register searchProducts WebMCP tool:", err);
        }
      }
    }
  }, [router]);

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
    <header className="w-full h-16 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm fixed top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <Logo />

        <button
          className="md:hidden p-2 rounded-full hover:bg-neutral-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-neutral-800"
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

        <ul className="hidden md:flex items-center gap-4">
          {/* Search */}
          <li className="flex items-center bg-neutral-100/80 hover:bg-neutral-100 border border-neutral-200/40 rounded-full px-3 py-1.5 transition-all duration-300 focus-within:bg-white focus-within:border-neutral-300/80">
            <SearchBar
              open={openSearch}
              query={query}
              onChange={handleSearching}
              onSubmit={handleSearchSubmit}
              onClose={() => setOpenSearch(false)}
              onOpen={() => setOpenSearch(true)}
              inputRef={searchRef}
            />
          </li>

          {/* Favourites */}
          <li>
            <Link 
              href="/favourites" 
              className="block p-2.5 rounded-full hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 transition-all duration-200"
              aria-label="Favourites"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
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
          <li className="relative">
            <Link 
              href="/cart" 
              className="block p-2.5 rounded-full hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 transition-all duration-200"
              aria-label="Shopping Cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 4h1.5L9 16h8m-8 0a2 2 0 100 4 2 2 0 000-4Zm8 0a2 2 0 100 4 2 2 0 000-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-neutral-900 min-w-5 h-5 flex items-center justify-center rounded-full text-white text-[10px] font-bold px-1.5 border border-white transition-all scale-100 hover:scale-110">
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
