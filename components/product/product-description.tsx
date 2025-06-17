// components/product/product-description.tsx
import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 py-10 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 !text-[32px] font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full  p-2 text-sm text-slate-700">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>

      {/* Variant selector */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* Add to cart */}
      <AddToCart product={product} />
    </>
  );
}
