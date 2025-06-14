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

  // ✅ 當 filters 有變化，觸發重新查詢
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

    // ✅ 原寫法：const query = filters || initialQuery;
    // ✅ 修改為以下，允許 query 為空字串
    const query = filters ?? initialQuery ?? "";

    setLoading(true);
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        query, // 即使為空字串，也代表 All 商品
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
      {searchValue && (
        <p className="mb-4 text-black">
          {products.length === 0
            ? "There are no products that match "
            : `Showing ${products.length} ${
                products.length > 1 ? "results" : "result"
              } for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      )}

      {products.length === 0 && !loading && (
        <p className="py-10 text-center text-lg text-gray-500">
          沒有符合的產品
        </p>
      )}

      <AnimatePresence mode="wait">
        {products.length > 0 && (
          <motion.div
            key={filters || initialQuery || "default"} // ✅ 加上 key 可正確觸發動畫
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
                  className="px-6 py-2  disabled:opacity-50"
                  onClick={loadMore}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "載入更多"}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
