"use client";

import clsx from "clsx";
import type {
  FilterOnlyItem,
  PathFilterItem,
  SortFilterItem,
} from "lib/constants";
import { Suspense } from "react";
import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";

// 定義 ListItem 為三種 filter 的 union
export type ListItem = SortFilterItem | PathFilterItem | FilterOnlyItem;

export default function FilterList({
  list,
  title,
}: {
  list: ListItem[];
  title?: string;
}) {
  const isSortList =
    Array.isArray(list) &&
    list.length > 0 &&
    "slug" in list[0]! &&
    "sortKey" in list[0]!;

  return (
    <nav className="space-y-2">
      {title && (
        <h3 className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 hidden md:block">
          {title}
        </h3>
      )}
      <ul
        className={clsx(
          "hidden md:flex w-full flex-wrap",
          isSortList ? "flex-col" : "flex-row gap-2"
        )}
      >
        <Suspense fallback={null}>
          {list.map((item, i) => (
            <FilterItem
              key={i}
              item={item}
              listType={isSortList ? "column" : "row"}
            />
          ))}
        </Suspense>
      </ul>
      {/* Mobile Dropdown 版本 */}
      <ul className="md:hidden">
        <Suspense fallback={null}>
          <FilterItemDropdown list={list} />
        </Suspense>
      </ul>
    </nav>
  );
}
