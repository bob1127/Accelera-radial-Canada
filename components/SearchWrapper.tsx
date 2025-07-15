"use client";

import { Suspense } from "react";
import Search, { SearchSkeleton } from "../components/layout//navbar/search";

export default function SearchWrapper() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <Search />
    </Suspense>
  );
}
