import { RainbowButton } from "@/components/magicui/rainbow-button";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect } from "react";
export default function ScrollTriggerCards() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const scrollTriggerSettings = {
      trigger: ".main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    gsap.utils.toArray(".row").forEach((row, index) => {
      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");

      const leftXValues = [-800, -900, -400];
      const rightXValues = [800, 900, 400];
      const leftRotationValues = [-30, -20, -35];
      const rightRotationValues = [30, 20, 35];
      const yValues = [100, -150, -400];

      gsap.to(cardLeft, {
        x: leftXValues[index],
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`;
            cardRight.style.transform = `translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`;
          },
        },
      });
    });

    gsap.to(".logo", {
      scale: 1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to(".line p", {
      y: 0,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.1,
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to("button", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power1.out",
      delay: 0.25,
      scrollTrigger: scrollTriggerSettings,
    });
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden font-sans">
      <section className="flex justify-center items-center h-screen"></section>

      <section className="main flex flex-col items-center w-screen h-[150vh]">
        <div className="main-content absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="logo w-[150px] h-[150px] rounded-full overflow-hidden scale-0">
            <img
              src="/assets/Accelera-white-tire-stickers-center-4-decals.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="copy my-8 flex flex-col items-center">
            <div className="line h-7 my-2">
              <p className="text-lg translate-y-8">
                加速器輪胎是什麼？ EPTYRES公司生產的加速器輪胎是<br></br>
                橡膠的原產地是印度尼西亞製造的，在美國和歐洲等地非常受歡迎。
              </p>
            </div>
            <div className="line h-7 my-2">
              <p className="text-lg translate-y-8">OUR BEGINNING</p>
            </div>
            <div className="line h-7 my-2">
              <p className="text-lg text-[#eeecec] translate-y-8">
                Take the fast lane to mastery.
              </p>
            </div>
            <RainbowButton asChild variant="outline">
              <Link href="/search">Get Unlimited Access</Link>
            </RainbowButton>
          </div>
        </div>

        {[1, 2, 3].map((_, i) => (
          <div
            className="row w-full h-[400px] lg:h-[600px] my-4 flex justify-center gap-8"
            key={i}
          >
            <div className="card card-left w-1/2 lg:w-2/5  !aspect-[4/3] !h-[350px] sm:!h-[450px] lg:!h-[600px] rounded-lg overflow-hidden">
              <img
                src={`/assets/img-${i * 2 + 1}.jpg`}
                alt="Card Left"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="card card-right w-1/2 lg:w-2/5  !aspect-[4/3] !h-[350px] sm:!h-[450px] lg:!h-[600px] rounded-lg overflow-hidden">
              <img
                src={`/assets/img-${i * 2 + 2}.jpg`}
                alt="Card Right"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </section>

      <section className="footer flex-col h-[50vh] flex justify-center items-center">
        <a href="#" className="text-[4vw] text-white">
          About
        </a>
        <p className="text-white leading-relaxed max-w-[500px] text-center tracking-wide">
          PT. Elangperdana Tyre Industry started in producing its ﬁrst tyre in
          year 1996. The factory is located at a unique landscape near mountain
          side in Sub - County Citeureup, Bogor city, three kilometers north of
          the Sentul International Circuit with a total area of 208,000 sqm of
          land. Well planned factory design combined with the latest technology
          machinery and equipments from Europe is our basic asset in making our
          tires. Safety Concern, Innovation, Creativity, and Customer
          Orientation are factors which we have and by combining these factors
          we produce our tires in order to meet your expectation for a tire.
        </p>
      </section>
    </div>
  );
}
