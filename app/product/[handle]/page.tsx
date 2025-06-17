import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GridTileImage } from "components/grid/tile";
import { Gallery } from "components/product/gallery";
import { ProductProvider } from "components/product/product-context";
import { ProductDescription } from "components/product/product-description";
import ProductDetail from "components/product/product-details-content";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import { Image } from "lib/shopify/types";

import Link from "next/link";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <ProductProvider>
      <div className="bg-[#ffffff]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd),
          }}
        />
        <div className="mx-auto  py-14 sm:py-20 max-w-(--breakpoint-3xl) px-4">
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-[#ffffff] p-8 md:p-12 lg:flex-row mx-auto max-w-[1920px] items-center justify-center lg:gap-8 dark:border-neutral-800 ">
            <div className="h-full w-full  mt-20 basis-full lg:basis-4/6">
              <div className="mb-6 text-sm  text-gray-500">
                <Link href="/" className="hover:underline">
                  首頁
                </Link>{" "}
                /{" "}
                <Link href="/search" className="hover:underline">
                  商品列表
                </Link>{" "}
                / <span className="text-gray-700">{product.title}</span>
              </div>
              <div className="flex flex-col gap-6 pb-20 pt-10 lg:flex-row lg:gap-8">
                {/* 左側：Gallery */}
                <div className="w-full lg:w-2/3">
                  <Suspense
                    fallback={
                      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden bg-neutral-200" />
                    }
                  >
                    <Gallery
                      images={product.images
                        .slice(0, 5)
                        .map((image: Image) => ({
                          src: image.url,
                          altText: image.altText,
                        }))}
                    />
                  </Suspense>
                </div>

                {/* 右側：ProductDescription */}
                <div className="w-full lg:w-1/3">
                  <Suspense fallback={null}>
                    <ProductDescription product={product} />
                  </Suspense>
                </div>
              </div>

              <ProductDetail product={product} />
              <img
                src="/images/index/DM.jpg"
                alt=""
                className="max-w-[650px] "
              ></img>
            </div>
          </div>
          <RelatedProducts id={product.id} />
        </div>
      </div>
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
