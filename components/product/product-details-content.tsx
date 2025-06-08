// components/product/product-details-content.tsx
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import ProductSwiper from "../../components/product-swiper";

export default function ProductDetailsContent({
  product,
}: {
  product: Product;
}) {
  if (!product.descriptionHtml) return null;

  return (
    <div className="mt-10 w-full rounded-lg border border-neutral-200  p-8 md:p-12 dark:border-neutral-800 bg-[#1a1a1a]">
      <ProductSwiper
        images={[
          { src: "/images/index/banner/banner05.jpg", alt: "Product 1" },
          { src: "/images/index/banner/banner06.jpg", alt: "Product 2" },
          { src: "/images/index/banner/banner04.jpg", alt: "Product 3" },
        ]}
      />

      <h2 className="text-2xl font-bold mb-4">產品詳情</h2>
      <Prose
        className="text-sm leading-relaxed dark:text-white/[70%]"
        html={product.descriptionHtml}
      />
    </div>
  );
}
