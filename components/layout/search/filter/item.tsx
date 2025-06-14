"use client";

import clsx from "clsx";
import type {
  FilterOnlyItem,
  ListItem,
  PathFilterItem,
  SortFilterItem,
} from "lib/constants";
import { createUrl } from "lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  newParams.delete("q");

  const DynamicTag = active ? "p" : Link;

  return (
    <li
      className={clsx(
        "text-black dark:text-white",
        listType === "row" ? "mr-2 mb-2" : "mt-2 flex"
      )}
    >
      <DynamicTag
        href={createUrl(item.path, newParams)}
        className={clsx(
          "text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100",
          {
            underline: active,
          }
        )}
      >
        {item.title}
      </DynamicTag>
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
  const searchParams = useSearchParams();

  if (!item.slug) return null; // 防止 null crash（針對 SortFilterItem）

  const [key, value] = useMemo<[string, string]>(() => {
    return item.slug!.includes("_")
      ? (item.slug!.split("_") as [string, string])
      : ["sort", item.slug!];
  }, [item.slug]);

  const isActive = searchParams.get(key) === value;

  const newParams = new URLSearchParams(searchParams.toString());
  newParams.set(key, value);

  const href = createUrl(pathname, newParams);

  return (
    <li
      className={clsx(
        "text-sm text-black dark:text-white",
        listType === "row" ? "mr-2 mb-2" : "mt-2 flex"
      )}
    >
      {isActive ? (
        <p className="underline underline-offset-4">{item.title}</p>
      ) : (
        <Link
          prefetch={false}
          href={href}
          className="hover:underline hover:underline-offset-4"
        >
          {item.title}
        </Link>
      )}
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
