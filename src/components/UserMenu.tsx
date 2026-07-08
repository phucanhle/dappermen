"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <li>
        <span className="block p-2.5 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors relative">
          <svg
            className="w-5 h-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </span>
      </li>
    );
  }

  if (!session?.user) {
    return (
      <li>
        <Link 
          href="/login" 
          className="block p-2.5 rounded-full hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 transition-all duration-200"
          aria-label="Sign In"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </li>
    );
  }

  return (
    <li className="relative" ref={dropdownRef}>
      <button
        onClick={() => setUserMenuOpen(!isMenuOpen)}
        className="flex items-center justify-end w-full gap-2 px-3 py-2 cursor-pointer focus:outline-none"
      >
        Hello,{" "}
        <span className="font-semibold">
          {session.user.name || session.user.email}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="relative md:absolute right-0 mt-2 w-full md:w-48 md:bg-gray-50 md:border md:border-gray-100 rounded md:shadow-lg z-50">
          <ul>
            {(session?.user as any)?.role === "admin" && (
              <li>
                <Link
                  href="/admin"
                  className="block px-4 text-right text-sm py-2 hover:bg-gray-100 font-semibold text-[#d4af37]"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/user/profile"
                className="block px-4 text-right text-sm py-2 hover:bg-gray-100"
                onClick={() => setUserMenuOpen(false)}
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <Link
                href="/user/histories"
                className="block px-4 text-right text-sm py-2 hover:bg-gray-100"
                onClick={() => setUserMenuOpen(false)}
              >
                Order History
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full text-right px-4 text-sm py-2 text-red-500 hover:bg-red-50"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}

export function UserMenuMobile({
  setMenuOpen,
}: {
  setMenuOpen: (isOpen: boolean) => void;
}) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <li>
        <div className="p-4 relative ">
          <svg
            className="w-5 h-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      </li>
    );
  }

  if (!session?.user) {
    return (
      <li>
        <Link
          href="/login"
          className="flex items-center justify-between p-4 gap-4 bg-gray-50 active:scale-[0.98]"
          onClick={() => setMenuOpen(false)}
        >
          <span className="font-medium">Login</span>
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </li>
    );
  }

  return (
    <li className="relative" ref={dropdownRef}>
      <button
        onClick={() => setUserMenuOpen(!isMenuOpen)}
        className="flex items-center justify-end w-full gap-2 px-3 py-2 cursor-pointer focus:outline-none"
      >
        Hello,{" "}
        <span className="font-semibold">
          {session.user.name || session.user.email}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="relative md:absolute right-0 mt-2 w-full md:w-48 md:bg-gray-50 md:border md:border-gray-100 rounded md:shadow-lg z-50">
          <ul>
            {(session?.user as any)?.role === "admin" && (
              <li>
                <Link
                  href="/admin"
                  className="block px-4 text-right py-2 hover:bg-gray-100 font-semibold text-[#d4af37]"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/user/profile"
                className="block px-4 text-right py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Edit Profile
              </Link>
            </li>
            <li>
              <Link
                href="/user/histories"
                className="block px-4 text-right py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Order History
              </Link>
            </li>
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full text-right px-4 py-2 text-red-500 hover:bg-red-50"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}
