import { getCollectionProducts } from "../../lib/shopify";
import { Product } from "../../lib/shopify/types";
import CarouselTabsWrapper from "./CarouselWrapper";

const CATEGORY_HANDLE_MAP = {
  Passenger: "passenger",
  "Drift&Track": "drift-track",
  Rally: "rally",
  Truck: "truck",
  "Winter&Snow": "winter-snow",
};

const bannerMap: Record<string, string> = {
  Passenger: "/images/all-kind-of-tire/passenger.webp",
  "Drift&Track": "/images/all-kind-of-tire/drift&trace.webp",
  Rally: "/images/all-kind-of-tire/rally.webp",
  Truck: "/images/all-kind-of-tire/truck-tire.webp",
  "Winter&Snow": "/images/all-kind-of-tire/winter&snow.webp",
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
