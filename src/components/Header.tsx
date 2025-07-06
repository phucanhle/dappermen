"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
    const [openSearch, setOpenSearch] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);

    useEffect(() => {
        if (searchRef.current) {
            gsap.set(searchRef.current, {
                width: "0px",
                marginLeft: "0px",
                marginRight: "0px",
            });
        }
    }, []);

    useEffect(() => {
        if (searchRef.current) {
            if (openSearch) {
                gsap.to(searchRef.current, {
                    width: "200px",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    duration: 0.3,
                    ease: "power1.out",
                    onComplete: () => {
                        searchRef.current?.focus(); // 👈 Focus sau khi animation xong
                    },
                });
            } else {
                gsap.to(searchRef.current, {
                    width: "0px",
                    marginLeft: "0px",
                    marginRight: "0px",
                    duration: 0.3,
                    ease: "power1.in",
                });
            }
        }
    }, [openSearch]);

    return (
        <header className="w-full h-20 bg-white border-b shadow-sm fixed top-0 z-50">
            <div className="max-w-[1440px] mx-auto h-full px-4 flex items-center justify-between">
                <Logo />

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden p-2"
                    onClick={() =>
                        setIsMobileMenuOpen(
                            !isMobileMenuOpen
                        )
                    }
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

                {/* Main Nav (Desktop) */}
                <ul className="hidden md:flex items-center gap-3">
                    {/* Search */}
                    <li className="flex items-center bg-[#EBEBEB] p-2 ">
                        <button
                            onClick={() =>
                                setOpenSearch(!openSearch)
                            }
                        >
                            <svg
                                className="w-6 h-6 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </button>
                        <input
                            ref={searchRef}
                            type="search"
                            className="outline-none border-b bg-transparent"
                        />
                        <button
                            className={`transition-all ${
                                openSearch
                                    ? "block mx-2"
                                    : "hidden"
                            }`}
                            onClick={() =>
                                setOpenSearch(false)
                            }
                        >
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
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </li>

                    {/* Favourites */}
                    <li className="bg-[#EBEBEB] p-2 ">
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
                    <li className="bg-[#EBEBEB] p-2 ">
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
                        </Link>
                    </li>

                    {/* Login */}
                    <li className="bg-[#EBEBEB] p-2 ">
                        <Link href="/login">
                            <svg
                                className="w-6 h-6 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu (nếu muốn mở rộng sau) */}
            {isMobileMenuOpen && (
                <div className="relative md:hidden px-8 py-4 bg-white w-screen  h-screen">
                    <ul className="flex flex-col gap-4 text-gray-800 w-full">
                        {/* Favourites */}
                        <li>
                            <Link
                                href="/favourites"
                                className="flex items-center gap-4 py-2"
                                onClick={() =>
                                    setIsMobileMenuOpen(
                                        false
                                    )
                                }
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
                                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                    />
                                </svg>
                                Favourites
                            </Link>
                        </li>

                        {/* Cart */}
                        <li>
                            <Link
                                href="/cart"
                                className="flex items-center gap-4 py-2"
                                onClick={() =>
                                    setIsMobileMenuOpen(
                                        false
                                    )
                                }
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
                                        d="M5 4h1.5L9 16h8m-8 0a2 2 0 100 4 2 2 0 000-4Zm8 0a2 2 0 100 4 2 2 0 000-4Zm-8.5-3h9.25L19 7H7.312"
                                    />
                                </svg>
                                Cart
                            </Link>
                        </li>

                        {/* Login */}
                        <li>
                            <Link
                                href="/login"
                                className="flex items-center gap-4 py-2"
                                onClick={() =>
                                    setIsMobileMenuOpen(
                                        false
                                    )
                                }
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                                Login
                            </Link>
                        </li>

                        {/* Search Toggle */}
                        <li className="relative w-full flex justify-start gap-4">
                            <button
                                onClick={() =>
                                    setOpenSearch(
                                        !openSearch
                                    )
                                }
                                className="flex items-center gap-4"
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
                                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </button>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full ring-0 outline-0 py-2 border border-transparent focus:border-b-gray-900"
                            />
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}
