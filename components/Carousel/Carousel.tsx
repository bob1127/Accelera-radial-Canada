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
    />
  );
}
