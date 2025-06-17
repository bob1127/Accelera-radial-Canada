import ProductGridClient from "app/search/product-grid-client";
import { defaultSort, sorting } from "lib/constants";
import { getCollection, getProducts } from "lib/shopify";
import { notFound } from "next/navigation";

// ✅ 不加型別限制，繞過 Canary 的型別推導 bug
export async function generateMetadata({ params }: any) {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

// ✅ 主頁面一樣使用 any 避開推導
export default async function CategoryPage({ params, searchParams }: any) {
  const { collection } = params;
  const { sort, width, aspect } = searchParams || {};

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const filters: string[] = [`tag:collection_${collection}`];

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

  const query = filters.join(" AND ");

  const { products } = await getProducts({
    query,
    sortKey,
    reverse,
    first: 30,
  });

  return (
    <section className="w-full max-w-[1400px]  px-4">
      <ProductGridClient
        initialProducts={products}
        initialPageInfo={{ hasNextPage: false, endCursor: null }}
        searchValue={collection}
        sortKey={sortKey}
        reverse={reverse}
        filters={query}
        initialQuery={query}
      />
    </section>
  );
}
