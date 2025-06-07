export const dynamic = "force-dynamic";
import { getCollectionProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

export async function Carousel() {
  const products = await getCollectionProducts({
    collection: "hidden-homepage-carousel",
  });

  if (!products?.length) return null;

  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full bg-black overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4 px-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}-${i}`}
            className="flex-none w-2/3 max-w-[300px] p-8 md:w-1/3 aspect-[3/4] bg-[#1d1d1d] overflow-hidden shadow-md"
          >
            <Link href={`/product/${product.handle}`} className="block h-full">
              <h3 className="text-base font-semibold line-clamp-2 leading-snug">
                {product.title}
              </h3>
              <div className="relative bg-transparent w-full h-48 md:h-64">
                <Image
                  src={product.featuredImage?.url}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mt-1">
                  {product.priceRange.maxVariantPrice.amount}
                  &nbsp;
                  {product.priceRange.maxVariantPrice.currencyCode}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
