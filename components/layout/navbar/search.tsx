"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState(searchParams?.get("q") || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setExpanded(false);
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleIconClick = () => {
    if (expanded) {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      } else {
        setExpanded(false);
        setQuery("");
      }
    } else {
      setExpanded(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center transition-all duration-300 ${
        expanded ? "w-full lg:w-80" : "w-10"
      }`}
    >
      <input
        ref={inputRef}
        type="text"
        name="q"
        placeholder="Search..."
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`text-md transition-all duration-300 ease-in-out rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400 ${
          expanded
            ? "opacity-100 w-full pr-10"
            : "opacity-0 w-0 p-0 border-none"
        }`}
      />
      <button
        type="button"
        onClick={handleIconClick}
        className="absolute right-0 mr-2 flex h-full items-center justify-center"
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-black dark:text-white" />
      </button>
    </form>
  );
}

// 👉 Optional fallback component for Suspense
export function SearchSkeleton() {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-lg">
      <MagnifyingGlassIcon className="h-5 w-5 text-neutral-500" />
    </div>
  );
}
