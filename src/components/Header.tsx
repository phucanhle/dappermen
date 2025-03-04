"use client";
import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import gsap from "gsap";
import Link from "next/link";

export default function Header() {
    const [openSearch, setOpenSearch] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    // Thiết lập trạng thái ban đầu của input: width = 0
    useEffect(() => {
        if (searchRef.current) {
            gsap.set(searchRef.current, {
                width: "0px",
                marginLeft: "0px",
                marginRight: "0px",
            });
        }
    }, []);

    // Animation mở/đóng input khi openSearch thay đổi
    useEffect(() => {
        if (searchRef.current) {
            if (openSearch) {
                gsap.to(searchRef.current, {
                    width: "200px", // Thay đổi theo kích thước bạn muốn
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    duration: 0.3,
                    ease: "power1.out",
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
        <header className="w-full h-[80px] bg-white border-b">
            <div className="w-full max-w-[1440px] flex justify-between items-center mx-auto h-full px-4">
                <Logo />
                <ul className="flex gap-3 items-center">
                    <li className="size-fit bg-[#EBEBEB] p-2 flex transition-all duration-500 items-center">
                        <button
                            className="flex size-fit cursor-pointer"
                            onClick={() =>
                                setOpenSearch(!openSearch)
                            }
                        >
                            <svg
                                className="w-6 h-6 text-gray-800"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </button>
                        <input
                            ref={searchRef}
                            type="search"
                            className="outline-none border-b"
                        />
                        <button
                            className={`outline-none cursor-pointer ${
                                openSearch
                                    ? "block mx-2"
                                    : "hidden"
                            }`}
                            onClick={() =>
                                setOpenSearch(false)
                            }
                        >
                            <svg
                                className="w-6 h-6 text-gray-800 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                />
                            </svg>
                        </button>
                    </li>
                    <li className="size-fit bg-[#EBEBEB] p-2">
                        <Link href="/favourites">
                            <svg
                                className="w-6 h-6 text-gray-800 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                />
                            </svg>
                        </Link>
                    </li>
                    <li className="size-fit bg-[#EBEBEB] p-2">
                        <Link href="/cart">
                            <svg
                                className="w-6 h-6 text-gray-800 "
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                                />
                            </svg>
                        </Link>
                    </li>
                    <li className="size-fit bg-[#EBEBEB] p-2">
                        <Link href="/login">
                            <svg
                                className="w-6 h-6 text-gray-800"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
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
        </header>
    );
}
