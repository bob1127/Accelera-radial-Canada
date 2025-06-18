"use client";

import clsx from "clsx";
import type {
  FilterOnlyItem,
  ListItem,
  PathFilterItem,
  SortFilterItem,
} from "lib/constants";
import { createUrl } from "lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type LayoutType = "row" | "column";

function PathFilterItemComponent({
  item,
  listType = "column",
}: {
  item: PathFilterItem;
  listType?: LayoutType;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = pathname === item.path;

  const newParams = new URLSearchParams(searchParams.toString());
  newParams.delete("q");

  const href = createUrl(item.path, newParams);

  const handleClick = () => {
    router.push(href);
    router.refresh();
  };

  return (
    <li className="mr-2 mb-2 mt-3">
      <button
        onClick={handleClick}
        className={clsx(
          "cursor-pointer px-4 py-2 text-sm rounded border transition-colors duration-200",
          active
            ? "bg-black text-white border-black"
            : "bg-white text-black border-gray-300 hover:bg-gray-100"
        )}
      >
        {item.title}
      </button>
    </li>
  );
}

function SortOrFilterItemComponent({
  item,
  listType = "column",
}: {
  item: SortFilterItem | FilterOnlyItem;
  listType?: LayoutType;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!item.slug) return null;

  const [key, value] = useMemo<[string, string]>(() => {
    return item.slug!.includes("_")
      ? (item.slug!.split("_") as [string, string])
      : ["sort", item.slug!];
  }, [item.slug]);

  const isActive = searchParams.get(key) === value;

  const newParams = new URLSearchParams(searchParams.toString());
  newParams.set(key, value);
  const href = createUrl(pathname, newParams);

  const handleClick = () => {
    router.push(href);
    router.refresh();
  };

  return (
    <li className="mr-2 mb-2 mt-3">
      <button
        onClick={handleClick}
        className={clsx(
          "cursor-pointer px-4 py-2 text-sm rounded border transition-colors duration-200",
          isActive
            ? "bg-black text-white border-black"
            : "bg-white text-black border-gray-300 hover:bg-gray-100"
        )}
      >
        {item.title}
      </button>
    </li>
  );
}

export function FilterItem({
  item,
  listType = "column",
}: {
  item: ListItem;
  listType?: LayoutType;
}) {
  if ("path" in item) {
    return <PathFilterItemComponent item={item} listType={listType} />;
  }

  if ("slug" in item && item.slug === null) {
    return null;
  }

  return <SortOrFilterItemComponent item={item} listType={listType} />;
}
