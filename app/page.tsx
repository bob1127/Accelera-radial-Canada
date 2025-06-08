import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import AccordionHover from "../components/AccordionHover";
import GridHover from "../components/GridHover";
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
      <div className="bg-[#0f0f0f] p-8">
        <ThreeItemGrid />
      </div>
      <Carousel />

      <ScrollSlider />

      <AccordionHover />
      <GridHover />
      <SliderCard />
    </div>
  );
}
