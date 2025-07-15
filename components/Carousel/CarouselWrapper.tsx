"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "../../lib/shopify/types";

export default function CarouselTabsWrapper({
  categorizedProducts,
  categoryNames,
  bannerMap,
}: {
  categorizedProducts: Record<string, Product[]>;
  categoryNames: string[];
  bannerMap: Record<string, string>;
}) {
  const [activeTab, setActiveTab] = useState<string>(categoryNames[0]!);

  const scroll = (dir: "left" | "right") => {
    const el = document.getElementById(`carousel-${activeTab}`);
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  const contentMap: Record<
    string,
    {
      tag: string;
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    }
  > = {
    Passenger: {
      tag: "passenger",
      title: "City Comfort Series",
      description:
        "Designed for daily commuting and family use, offering outstanding comfort and low noise, perfect for city and highway drives.",
      buttonText: "Learn More",
      buttonLink: "/collections/phi",
    },
    "Drift&Track": {
      tag: "drift-track",
      title: "Track Performance Series",
      description:
        "Built for drifting and track racing, delivering high grip and sharp cornering response—your go-to for ultimate control.",
      buttonText: "Learn More",
      buttonLink: "/collections/phi",
    },
    Rally: {
      tag: "rally",
      title: "Rally Terrain Series",
      description:
        "Handles diverse terrains including gravel, mud, and hilly roads, combining stability and durability for off-road adventures.",
      buttonText: "Shop Now",
      buttonLink: "/collections/eco-plush",
    },
    Truck: {
      tag: "truck",
      title: "Heavy Load Series",
      description:
        "Ideal for commercial and heavy-duty applications, reinforced structure ensures long-haul durability and stability.",
      buttonText: "Shop Now",
      buttonLink: "/collections/eco-plush",
    },
    "Winter&Snow": {
      tag: "winter-snow",
      title: "Winter Snow Series",
      description:
        "Specially engineered for cold and slippery conditions, enhancing traction and braking on snow and ice for safe winter driving.",
      buttonText: "Shop Now",
      buttonLink: "/collections/eco-plush",
    },
    // Add other categories as needed...
  };

  const currentContent = contentMap[activeTab];

  return (
    <div className="w-full">
      {/* Tabs 切換列 */}
      <div className="flex flex-wrap gap-2 px-4 mb-4">
        {categoryNames.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              activeTab === category
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Banner + 說明區塊 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row  mb-4  items-stretch min-h-[380px]"
        >
          {/* 左側圖片 */}
          <div className="relative w-full h-[220px] sm:h-auto sm:w-1/2">
            {bannerMap[activeTab] && (
              <Image
                src={bannerMap[activeTab]}
                alt={`${activeTab} banner`}
                fill
                className="object-cover w-full h-full"
              />
            )}
          </div>

          {/* 右側文字說明 */}
          <div className=" w-full sm:w-1/2 flex group flex-col  justify-center bg-white px-4 sm:px-12 py-6">
            {currentContent && (
              <>
                <span className="text-sm text-gray-50 bg-black max-w-[90px] rounded-full py-1 text-center mb-2">
                  {currentContent.tag}
                </span>
                <h2 className="text-2xl font-bold text-black mb-3">
                  {currentContent.title}
                </h2>
                <p className="text-gray-700 mb-4">
                  {currentContent.description}
                </p>

                {/* Fade-up + translateY 效果 */}
                <Link
                  href={currentContent.buttonLink}
                  className=" opacity-100 sm:opacity-0 sm:translate-y-10 translate-y-0 text-center group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 max-w-[120px]  ease-out inline-block bg-black text-white px-6 py-2 text-sm  hover:bg-gray-800"
                >
                  {currentContent.buttonText}
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 左右箭頭 + 輪播 */}
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
                className="group snap-start h-[270px] md:h-[350px] flex-none w-full max-w-[250px] p-0 lg:p-8 md:w-2/3 aspect-[3/5.5] bg-white overflow-hidden shadow-md"
              >
                <Link
                  href={`/product/${product.handle}`}
                  className="block h-full"
                >
                  <div className="relative w-full group-hover:scale-[.9] duration-500 scale-[.8] h-[170px] md:h-[210px]">
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
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-3 bg-black text-white text-sm px-4 py-2">
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
