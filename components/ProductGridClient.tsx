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

  useEffect(() => {
    if (!collection) return;

    const sort = searchParams.get("sort") || "relevance";
    const width = searchParams.get("width");
    const aspect = searchParams.get("aspect");

    const filters = [`tag:collection_${collection}`];
    if (width) filters.push(`tag:width_${width}`);
    if (aspect) filters.push(`tag:aspect_${aspect}`);

    const query = filters.join(" AND ");
    const sortKey = sort === "price-desc" ? "PRICE" : "RELEVANCE";
    const reverse = sort === "price-desc";

    console.log("🔁 Trigger useEffect");
    console.log("📦 Collection:", collection);
    console.log("📄 Filters:", filters);
    console.log("🔍 Query:", query);
    console.log("⬇️ Sort Key:", sortKey);
    console.log("↕️ Reverse:", reverse);

    const fetchFiltered = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, sortKey, reverse, first: 30 }),
        });

        const json = await res.json();
        console.log("✅ API Response:", json);

        setProducts(json.products || []);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
  }, [collection, searchParams]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">找不到符合條件的商品</p>
      ) : (
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
      )}
    </div>
  );
}
