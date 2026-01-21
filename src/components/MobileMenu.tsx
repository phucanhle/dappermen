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
      <ul className="flex flex-col gap-4 text-gray-800 w-full">
        <UserMenuMobile setMenuOpen={setIsMobileMenuOpen} />
        <li>
          <Link
            href="/favourites"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between gap-4 p-4 bg-gray-50 active:scale-[0.98]"
          >
            <span className="font-medium">Favourites</span>

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
        <li>
          <Link
            href="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between gap-4 p-4  bg-gray-50 active:scale-[0.98]"
          >
            <span className="font-medium">Cart</span>

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
          </Link>
        </li>
        <li className="w-full flex flex-col items-center gap-2">
          <h1>Search</h1>
          <input
            type="text"
            placeholder="Type product name..."
            value={query}
            onChange={handleSearching}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
            className="w-full p-4 border-b focus:outline-none"
          />
          <button className="w-full p-4 text-center text-white bg-gray-700">
            Search
          </button>
        </li>
      </ul>
    </div>
  );
}
