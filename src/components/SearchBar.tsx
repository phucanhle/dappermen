"use client";
import { useEffect } from "react";

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
  // Focus input when opened
  useEffect(() => {
    if (open && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [open, inputRef]);

  return (
    <div className="flex items-center">
      <button 
        type="button" 
        onClick={onOpen}
        className="p-1 rounded-full text-neutral-600 hover:text-black transition-colors focus:outline-none"
        aria-label="Open Search"
      >
        <svg
          className="w-5 h-5"
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
        placeholder="Search apparel..."
        aria-label="Search apparel"
        className={`outline-none border-b border-neutral-300 text-xs md:text-sm bg-transparent transition-all duration-300 ease-out origin-right ${
          open 
            ? "w-40 md:w-48 opacity-100 mx-2 scale-x-100 pointer-events-auto" 
            : "w-0 opacity-0 mx-0 scale-x-0 pointer-events-none"
        }`}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit(e);
        }}
      />
      
      <button
        type="button"
        className={`transition-all duration-200 p-1 rounded-full text-neutral-400 hover:text-neutral-700 focus:outline-none ${
          open ? "block" : "hidden"
        }`}
        onClick={onClose}
        aria-label="Close Search"
      >
        <svg
          className="w-4 h-4"
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
    </div>
  );
}
