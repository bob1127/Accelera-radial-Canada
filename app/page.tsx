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
    <div className="">
      <HeroSlider />
      <div className="bg-black p-8">
        <ThreeItemGrid />
      </div>
      <Carousel />
      <ScrollSlider />
      <SliderCard />
    </div>
  );
}
