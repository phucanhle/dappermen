import Link from "next/link";
import { UserMenuMobile } from "./UserMenu";

export default function MobileMenu(
  query: string,
  handleSearching: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSearchSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  setIsMobileMenuOpen: (isOpen: boolean) => void
) {
  return (
    <div className="relative md:hidden p-4 gap-4 bg-white w-screen h-screen">
      <ul className="flex flex-col gap-4 text-neutral-800 w-full">
        <UserMenuMobile setMenuOpen={setIsMobileMenuOpen} />
        <li>
          <Link
            href="/favourites"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between gap-4 p-4 bg-surface-secondary active:scale-[0.98]"
          >
            <span className="font-medium">Favourites</span>

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
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
          </Link>
        </li>
        <li>
          <Link
            href="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between gap-4 p-4  bg-surface-secondary active:scale-[0.98]"
          >
            <span className="font-medium">Cart</span>

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
                d="M5 4h1.5L9 16h8m-8 0a2 2 0 100 4 2 2 0 000-4Zm8 0a2 2 0 100 4 2 2 0 000-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
          </Link>
        </li>
        <li className="w-full flex flex-col items-start gap-2 px-4">
          <label htmlFor="mobile-search" className="font-semibold text-neutral-800">
            Search
          </label>
          <input
            id="mobile-search"
            type="text"
            placeholder="Type product name..."
            value={query}
            onChange={handleSearching}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
            className="w-full px-3 py-2.5 border border-border-default rounded-lg text-sm bg-surface-secondary/30 font-sans focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-400"
          />
          <button className="w-full py-3 text-center text-white bg-neutral-950 hover:bg-neutral-800 font-sans font-semibold text-xs uppercase tracking-widest rounded-lg transition-all">
            Search
          </button>
        </li>
      </ul>
    </div>
  );
}
