import HeroSwiperSlider from "@/components/HeroSwiperSlider";
import Image from "next/image";
import Script from "next/script";
import Marquee from "react-fast-marquee";
import AccordionHover from "../components/AccordionHover";
import AutoInfiniteCarousel from "../components/AutoInfiniteCarousel";
import { Carousel } from "../components/Carousel/Carousel";
import GridHover from "../components/GridHover";
import ScrollBtn from "../components/ScrollButton";
import SliderCard from "../components/SliderCard/index";
import { WavyBackground } from "../components/ui/wavy-background";
export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://accelerashopify.vercel.app/#webpage",
        url: "https://accelerashopify.vercel.app",
        name: "Accelera Canada | Official Online Tire Store",
        description:
          "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
        inLanguage: "en",
        breadcrumb: {
          "@id": "https://accelerashopify.vercel.app/#breadcrumb",
        },
        isPartOf: {
          "@id": "https://accelerashopify.vercel.app/#website",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://accelerashopify.vercel.app/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://accelerashopify.vercel.app",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://accelerashopify.vercel.app/#website",
        url: "https://accelerashopify.vercel.app",
        name: "Accelera Canada Official Store",
        inLanguage: "en",
        publisher: {
          "@id": "https://accelerashopify.vercel.app/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://accelerashopify.vercel.app/#organization",
        name: "Accelera Canada",
        url: "https://accelerashopify.vercel.app",
        logo: {
          "@type": "ImageObject",
          url: "https://accelerashopify.vercel.app/logo.png", // ✅ 確保為實際英文版 logo 圖
        },
      },
    ],
  };
  interface Slide {
    image: string;
    title: string;
  }

  const slides: Slide[] = [
    { image: "/images/index/banner/banner06.png", title: "" },
    { image: "/images/index/banner/banner04.png", title: "" },
    { image: "/images/index/banner/banner02.png", title: "" },
  ];
  return (
    <div className="w-full overflow-hidden">
      <Script
        id="structured-data-home"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSwiperSlider slides={slides} />
      {/* <HeroSlider /> */}
      {/* <div className="bg-[#0f0f0f] p-8">
        <ThreeItemGrid />
      </div> */}
      <section className="section-intro ">
        <AutoInfiniteCarousel />
      </section>

      <section className="section-feature bg-[#F0F1F2] px-8 lg:px-0 flex flex-row items-center  py-20">
        <div className="title flex  w-full lg:w-[75%] mx-auto flex-col">
          <h2 className="text-[48px] mb-5 font-bold text-[#1D1D1F]">
            ALL KINDS OF TIRES
          </h2>

          <Carousel />
        </div>
      </section>
      <AccordionHover />
      {/* <div className="   w-full overflow-hidden">
        <ScrollSlider />
      </div> */}

      <SliderCard />
      <section className="relative pt-[100px]">
        <div className="txt w-full absolute left-1/2 -translate-x-1/2 z-20">
          <h2 className="text-[6vmin] text-center text-white  ">
            Stability. Safety. Full Acceleration.
          </h2>
          <p className="text-lg md:text-lg mt- text-white font-normal inter-var text-center">
            More Than a Tire. <br></br>It’s the Soul of Driving.
          </p>
        </div>
        <WavyBackground className="absolute z-30 left-0 top-[30%] lg:top-[25%] w-screen h-full mx-auto pb-40"></WavyBackground>
        <ScrollBtn />
      </section>
      <div id="outro-section">
        {" "}
        <GridHover />
      </div>

      <section className="outro h-screen flex  flex-col lg:flex-row items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold text-center px-3 sm:px-10 max-w-3xl">
          Where Performance Meets Precision
        </h1>

        <Marquee>
          <Image
            src="/images/social_media/NC0wv3luzKq8LTfh1YEk.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/GIVedMc5u6mgWSn2PkLX.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/dg1TllriYBhKV6v0kbwG.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/agu1m0gx5zkxT66qGD5i.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/4dCMzKG1NWCl2hgWp5tC.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/NC0wv3luzKq8LTfh1YEk.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/GIVedMc5u6mgWSn2PkLX.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/dg1TllriYBhKV6v0kbwG.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/agu1m0gx5zkxT66qGD5i.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/4dCMzKG1NWCl2hgWp5tC.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/yns5kpUUqHDmLYMa3hff.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/xZ95O1couXrIYqd83Cpk.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/rMgD2GJeagXAxcXDKsva.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/NsT4z1lX0I5lxqle9UPo.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/llPSlGdE2B1yGsbGgk4p.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/JknvmdieiSOfeRyj3cvc.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/Ga2UfdgTKhMMnbTwe54T.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/9jwDKdZtMI5Gsr6FoSB9.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/NC0wv3luzKq8LTfh1YEk.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/GIVedMc5u6mgWSn2PkLX.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/dg1TllriYBhKV6v0kbwG.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/agu1m0gx5zkxT66qGD5i.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/4dCMzKG1NWCl2hgWp5tC.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/NC0wv3luzKq8LTfh1YEk.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/GIVedMc5u6mgWSn2PkLX.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/dg1TllriYBhKV6v0kbwG.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/agu1m0gx5zkxT66qGD5i.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/4dCMzKG1NWCl2hgWp5tC.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/yns5kpUUqHDmLYMa3hff.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/xZ95O1couXrIYqd83Cpk.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/rMgD2GJeagXAxcXDKsva.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/NsT4z1lX0I5lxqle9UPo.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/llPSlGdE2B1yGsbGgk4p.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/JknvmdieiSOfeRyj3cvc.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/Ga2UfdgTKhMMnbTwe54T.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
          <Image
            src="/images/social_media/9jwDKdZtMI5Gsr6FoSB9.webp"
            alt=""
            placeholder="empty"
            loading="lazy"
            width={400}
            height={400}
            className=" w-[200px]"
          ></Image>
        </Marquee>
      </section>
    </div>
  );
}
