import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";
import ProductGridClient from "./product-grid-client";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage({ searchParams }: any) {
  const { sort, q: searchValue = "", width, aspect } = searchParams || {};

  const tagifiedSearchValue =
    typeof searchValue === "string" ? searchValue : "";

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const filters: string[] = [];

  // 關鍵字搜尋（轉為 tag:xxx）
  if (tagifiedSearchValue) filters.push(`tag:${tagifiedSearchValue}`);

  // 封裝：處理單值或多值
  const appendTagFilters = (
    key: string,
    value: string | string[] | undefined
  ) => {
    if (!value) return;
    const values = Array.isArray(value) ? value : [value];
    values.forEach((v) => filters.push(`tag:${key}_${v}`));
  };

  appendTagFilters("width", width);
  appendTagFilters("aspect", aspect);

  const filterQuery = filters.length > 0 ? filters.join(" AND ") : undefined;

  const { products, pageInfo } = await getProducts({
    sortKey,
    reverse,
    query: filterQuery,
    first: 15,
  });

  return (
    <ProductGridClient
      initialProducts={products}
      initialPageInfo={pageInfo}
      searchValue={tagifiedSearchValue}
      sortKey={sortKey}
      reverse={reverse}
      filters={filterQuery} // ✅ 傳 filterQuery 下去
    />
  );
}
