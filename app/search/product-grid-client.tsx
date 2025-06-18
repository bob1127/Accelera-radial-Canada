"use client";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProductGridClient({
  initialProducts,
  initialPageInfo,
  searchValue,
  sortKey,
  reverse,
  filters,
  initialQuery,
}: {
  initialProducts: any[];
  initialPageInfo: { hasNextPage: boolean; endCursor: string | null };
  searchValue: string;
  sortKey: string;
  reverse: boolean;
  filters?: string;
  initialQuery?: string;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFiltered = async () => {
      const query = filters || initialQuery;
      if (!query) return;
      setLoading(true);
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          query,
          sortKey,
          reverse,
          first: 12,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setProducts(json.products);
      setPageInfo(json.pageInfo);
      setLoading(false);
    };

    fetchFiltered();
  }, [filters, sortKey, reverse, initialQuery]);

  const loadMore = async () => {
    if (!pageInfo.hasNextPage || loading) return;

    const query = filters ?? initialQuery ?? "";

    setLoading(true);
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        query,
        sortKey,
        reverse,
        first: 12,
        after: pageInfo.endCursor || undefined,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    setProducts((prev) => [...prev, ...json.products]);
    setPageInfo(json.pageInfo);
    setLoading(false);
  };

  return (
    <>
      {products.length > 0 && (
        <>
          <p className="mb-1 !text-[16px] text-slate-300">
            Total {products.length}{" "}
            {products.length > 1 ? "products" : "product"} found
          </p>
          <p className="mb-4 text-slte-800">
            Showing {products.length}{" "}
            {products.length > 1 ? "products" : "product"}
            {searchValue && (
              <>
                {" for "}
                <span className="font-bold">&quot;{searchValue}&quot;</span>
              </>
            )}
          </p>
        </>
      )}

      {products.length === 0 && !loading && (
        <p className="py-10 text-center text-lg text-gray-500">
          No matching products found.
        </p>
      )}

      <AnimatePresence mode="wait">
        {products.length > 0 && (
          <motion.div
            key={filters || initialQuery || "default"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
            {pageInfo.hasNextPage && (
              <div className="mt-8 text-center">
                <button
                  className="px-6 py-2 text-white bg-slate-800 disabled:opacity-50"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
