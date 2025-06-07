import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import HeroSlider from "../components/HeroSlideContact/page";
import ScrollSlider from "../components/ScrollSlider/index";
import SliderCard from "../components/SliderCard/index";
export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="mt-[70px]">
      <HeroSlider />
      <div className="p-10 bg-black">
        <ThreeItemGrid />
      </div>
      <Carousel />
      <ScrollSlider />
      <SliderCard />
      <Footer />
    </div>
  );
}
