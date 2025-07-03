import { getCollectionProducts } from "../../lib/shopify";
import { Product } from "../../lib/shopify/types";
import CarouselTabsWrapper from "./CarouselWrapper";

const CATEGORY_HANDLE_MAP = {
  PHI: "phi",
  "Eco Plush": "eco-plush",
  "IOTA ST-68": "iota-st-68",
  OMIKRON: "omikron",
  "X-Grip N": "x-grip-n",
  "651 Sport Pro": "651-sport-pro",
  "351 Sport GD": "351-sport-gd",
  "MT-01": "mt-01",
  "IOTA EVT": "iota-evt",
};

const bannerMap: Record<string, string> = {
  PHI: "/images/index/banner/banner04.png",
  OMIKRON:
    "/images/index/category/472545244_18479660686032449_1760968529204912170_n.jpg",
  "Eco Plush":
    "/images/index/category/471322434_18477637159032449_7802630235560669119_n.jpg",
  "IOTA ST-68":
    "/images/index/category/471322434_18477637159032449_7802630235560669119_n.jpg",
  "X-Grip N":
    "/images/index/category/471322434_18477637159032449_7802630235560669119_n.jpg",
  "651 Sport Pro":
    "/images/index/category/469419629_18473443102032449_6229268480613632601_n.jpg",
  "351 Sport GD": "/images/banners/351-sport-gd.jpg",
  "MT-01": "/images/banners/mt-01.jpg",
  "IOTA EVT": "/images/banners/iota-evt.jpg",
};

export async function Carousel() {
  const categorizedProducts: Record<string, Product[]> = {};
  const validCategories: string[] = [];

  await Promise.all(
    Object.entries(CATEGORY_HANDLE_MAP).map(async ([label, handle]) => {
      const products = await getCollectionProducts({ collection: handle });
      const productCount = products?.length ?? 0;
      console.log(`Fetched [${label}] (${handle}) → ${productCount} items`);

      if (productCount > 0) {
        categorizedProducts[label] = products;
        validCategories.push(label);
      }
    })
  );

  return (
    <CarouselTabsWrapper
      categorizedProducts={categorizedProducts}
      categoryNames={validCategories}
      bannerMap={bannerMap}
    />
  );
}
