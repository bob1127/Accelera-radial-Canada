"use client";

import dynamic from "next/dynamic";

const ProductSwiper = dynamic(() => import("../../components/product-swiper"), {
  ssr: false,
});

export default ProductSwiper;
