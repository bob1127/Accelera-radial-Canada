"use client";

import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import type { Product } from "lib/shopify/types";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductGridClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const collection = params.collection as string;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  const fetchFiltered = async (loadMore = false) => {
    if (!collection) return;
    setLoading(true);

    const sort = searchParams.get("sort") || "relevance";
    const width = searchParams.get("width");
    const aspect = searchParams.get("aspect");

    const filters = [`tag:collection_${collection}`];
    if (width) filters.push(`tag:width_${width}`);
    if (aspect) filters.push(`tag:aspect_${aspect}`);

    const query = filters.join(" AND ");
    const sortKey = sort === "price-desc" ? "PRICE" : "RELEVANCE";
    const reverse = sort === "price-desc";

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          sortKey,
          reverse,
          first: 12,
          after: loadMore ? endCursor : null,
        }),
      });

      const { products: newProducts, pageInfo } = await res.json();

      if (loadMore) {
        setProducts((prev) => [...prev, ...newProducts]);
      } else {
        setProducts(newProducts);
      }

      setHasNextPage(pageInfo?.hasNextPage);
      setEndCursor(pageInfo?.endCursor);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      if (!loadMore) setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiltered(false);
  }, [collection, searchParams]);

  return (
    <div>
      {loading && products.length === 0 ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="py-8 text-center text-gray-500">No products found.</p>
      ) : (
        <>
          <p className="py-4 text-sm text-gray-600 text-left">
            Showing {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
          </p>
          <Grid>
            {products.map((product) => (
              <Grid.Item key={product.handle} className="animate-fadeIn">
                <Link
                  className="relative m-2 inline-block h-full w-full"
                  href={`/product/${product.handle}`}
                  prefetch={true}
                >
                  <GridTileImage
                    alt={product.title}
                    label={{
                      title: product.title,
                      amount: product.priceRange.maxVariantPrice.amount,
                      currencyCode:
                        product.priceRange.maxVariantPrice.currencyCode,
                    }}
                    src={product.featuredImage?.url}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </Link>
              </Grid.Item>
            ))}
          </Grid>
          {hasNextPage && (
            <div className="flex justify-center my-6">
              <button
                onClick={() => fetchFiltered(true)}
                className="px-6 py-2 text-white bg-slate-800 disabled:opacity-50"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
