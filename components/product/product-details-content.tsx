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
    <div className="mt-10 w-full md:w-[90%] 2xl:w-[80%] max-w-[1920px] mx-auto rounded-lg  dark:border-neutral-800 bg-[#ffffff]">
      <ProductSwiper
        images={[
          { src: "/images/index/banner/banner05.jpg", alt: "Product 1" },
          { src: "/images/index/banner/banner06.webp", alt: "Product 2" },
          { src: "/images/index/banner/banner04.jpg", alt: "Product 3" },
        ]}
      />

      <div className="flex justify-center py-20">
        <Prose
          className="text-sm max-w-[900px] tracking-wider leading-relaxed dark:text-white/[70%]"
          html={product.descriptionHtml}
        />
      </div>
    </div>
  );
}
