"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "../../lib/shopify/types";

export default function CarouselTabsWrapper({
  categorizedProducts,
  categoryNames,
}: {
  categorizedProducts: Record<string, Product[]>;
  categoryNames: string[];
}) {
  const [activeTab, setActiveTab] = useState<string>(categoryNames[0]!);

  const scroll = (dir: "left" | "right") => {
    const el = document.getElementById(`carousel-${activeTab}`);
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* Tabs 切換列 */}
      <div className="flex flex-wrap gap-2 px-4 mb-4">
        {categoryNames.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-full border ${
              activeTab === category
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 左右箭頭 */}
      <div className="relative w-full pb-6 pt-1">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-black text-white px-3 py-2"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-black text-white px-3 py-2"
        >
          →
        </button>

        {/* 動畫包裹商品輪播區 */}
        <AnimatePresence mode="wait">
          <motion.ul
            key={activeTab}
            id={`carousel-${activeTab}`}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {categorizedProducts[activeTab]?.map((product, i) => (
              <li
                key={`${product.handle}-${i}`}
                className="group snap-start h-[500px] flex-none w-full max-w-[400px] p-8 md:w-2/3 aspect-[3/5.5] bg-white overflow-hidden shadow-md"
              >
                <Link
                  href={`/product/${product.handle}`}
                  className="block h-full"
                >
                  <div className="relative w-full group-hover:scale-[.9] duration-500 scale-[.8] h-48 md:h-[330px]">
                    <Image
                      src={product.featuredImage.url}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                  </div>
                  <div className="relative p-4 transition-transform duration-300 group-hover:-translate-y-6">
                    <h3 className="text-base text-black font-semibold line-clamp-2 leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.priceRange.maxVariantPrice.amount}&nbsp;
                      {product.priceRange.maxVariantPrice.currencyCode}
                    </p>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3 bg-black text-white text-sm px-4 py-2 ">
                      Buy Now
                    </button>
                  </div>
                </Link>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
