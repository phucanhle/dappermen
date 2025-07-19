"use client";
import { useEffect } from "react";
import gsap from "gsap";

interface Props {
  open: boolean;
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose?: () => void;
  onOpen?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function SearchBar({
  open,
  query,
  onChange,
  onSubmit,
  onClose,
  onOpen,
  inputRef,
}: Props) {
  useEffect(() => {
    if (inputRef?.current) {
      if (open) {
        gsap.to(inputRef.current, {
          width: "200px",
          marginLeft: "1rem",
          marginRight: "1rem",
          duration: 0.3,
          ease: "power1.out",
          onComplete: () => {
            inputRef.current?.focus();
          },
        });
      } else {
        gsap.to(inputRef.current, {
          width: "0px",
          marginLeft: "0px",
          marginRight: "0px",
          duration: 0.3,
          ease: "power1.in",
        });
      }
    }
  }, [open, inputRef]);

  return (
    <>
      <button type="button" onClick={onOpen}>
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
        ref={inputRef}
        value={query}
        className="outline-none border-b bg-transparent"
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit(e);
        }}
      />
      <button
        type="button"
        className={`transition-all ${open ? "block mx-2" : "hidden"}`}
        onClick={onClose} // 👈 gắn hàm đóng
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
    </>
  );
}
