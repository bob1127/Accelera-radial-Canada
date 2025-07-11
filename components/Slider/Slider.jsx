"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./shaders.js";
import { slides } from "./slides.js";

const Slider = () => {
  const canvasRef = useRef(null);
  const sliderRef = useRef(null);

  let currentSlideIndex = 0;
  let isTransitioning = false;
  let slideTextures = [];
  let shaderMaterial, renderer;

  const createCharacterElements = (element) => {
    if (element.querySelectorAll(".char").length > 0) return;

    const words = element.textContent.split(" ");
    element.innerHTML = "";

    words.forEach((word, index) => {
      const wordDiv = document.createElement("div");
      wordDiv.className = "word flex text-[60px]";

      [...word].forEach((char) => {
        const charDiv = document.createElement("div");
        charDiv.className = "char block text-[60px] overflow-hidden";
        charDiv.innerHTML = `<span class="inline-block will-change-transform relative">${char}</span>`;
        wordDiv.appendChild(charDiv);
      });

      element.appendChild(wordDiv);

      if (index < words.length - 1) {
        const spaceChar = document.createElement("div");
        spaceChar.className = "word flex text-[60px]";
        spaceChar.innerHTML =
          '<div class="char block text-[60px] overflow-hidden"><span class="inline-block will-change-transform relative">&nbsp;</span></div>';
        element.appendChild(spaceChar);
      }
    });
  };

  const createLineElements = (element) => {
    new SplitText(element, {
      type: "lines",
      linesClass: "line overflow-hidden",
    });
    element.querySelectorAll(".line").forEach((line) => {
      line.innerHTML = `<span class="inline-block will-change-transform relative">${line.textContent}</span>`;
    });
  };

  const processTextElements = (container) => {
    const title = container.querySelector(".slide-title h1");
    if (title) createCharacterElements(title);

    container
      .querySelectorAll(".slide-description p")
      .forEach(createLineElements);
  };
  const createSlideElement = (slideData) => {
    const content = document.createElement("div");
    content.className =
      "slider-content absolute top-0 left-0 w-full h-full select-none z-20 opacity-0";

    content.innerHTML = `
    <div class="slide-title absolute top-[45%] left-1/2 -translate-x-1/2 text-center w-full">
      <h1 class="flex justify-center gap-[0.2em] text-[90px]">${slideData.title}</h1>
    </div>
    <div class="slide-description absolute bottom-10 left-0 w-full px-10 md:w-1/3 flex flex-col gap-6 text-left">
      <p>${slideData.description}</p>
      <div class="slide-info uppercase">
        <p>Type. ${slideData.type}</p>
        <p>Field. ${slideData.field}</p>
        <p>Date. ${slideData.date}</p>
      </div>
    </div>
  `;

    return content;
  };

  const animateSlideTransition = (nextIndex) => {
    const currentContent = document.querySelector(".slider-content");
    const slider = sliderRef.current;

    const timeline = gsap.timeline();

    timeline
      .to([...currentContent.querySelectorAll(".char span")], {
        y: "-100%",
        duration: 0.6,
        stagger: 0.025,
        ease: "power2.inOut",
      })
      .to(
        [...currentContent.querySelectorAll(".line span")],
        {
          y: "-100%",
          duration: 0.6,
          stagger: 0.025,
          ease: "power2.inOut",
        },
        0.1
      )
      .call(
        () => {
          const newContent = createSlideElement(slides[nextIndex]);

          timeline.kill();
          currentContent.remove();
          slider.appendChild(newContent);

          gsap.set(newContent.querySelectorAll("span"), { y: "100%" });

          setTimeout(() => {
            processTextElements(newContent);

            const newChars = newContent.querySelectorAll(".char span");
            const newLines = newContent.querySelectorAll(".line span");

            gsap.set([newChars, newLines], { y: "100%" });
            gsap.set(newContent, { opacity: 1 });

            gsap
              .timeline({
                onComplete: () => {
                  isTransitioning = false;
                  currentSlideIndex = nextIndex;
                },
              })
              .to(newChars, {
                y: "0%",
                duration: 0.5,
                stagger: 0.025,
                ease: "power2.inOut",
              })
              .to(
                newLines,
                {
                  y: "0%",
                  duration: 0.5,
                  stagger: 0.1,
                  ease: "power2.inOut",
                },
                0.3
              );
          }, 100);
        },
        null,
        0.5
      );
  };

  const setupInitialSlide = () => {
    const content = document.querySelector(".slider-content");

    processTextElements(content);

    const chars = content.querySelectorAll(".char span");
    const lines = content.querySelectorAll(".line span");

    gsap.fromTo(
      chars,
      { y: "100%" },
      { y: "0%", duration: 0.8, stagger: 0.025, ease: "power2.out" }
    );
    gsap.fromTo(
      lines,
      { y: "100%" },
      {
        y: "0%",
        duration: 0.8,
        stagger: 0.025,
        ease: "power2.out",
        delay: 0.2,
      }
    );
  };

  const initializeRenderer = async () => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTexture1: { value: null },
        uTexture2: { value: null },
        uProgress: { value: 0.0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uTexture1Size: { value: new THREE.Vector2(1, 1) },
        uTexture2Size: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader,
      fragmentShader,
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMaterial));

    const loader = new THREE.TextureLoader();
    for (const slide of slides) {
      const texture = await new Promise((resolve) =>
        loader.load(slide.image, resolve)
      );
      texture.minFilter = texture.magFilter = THREE.LinearFilter;
      texture.userData = {
        size: new THREE.Vector2(texture.image.width, texture.image.height),
      };
      slideTextures.push(texture);
    }

    shaderMaterial.uniforms.uTexture1.value = slideTextures[0];
    shaderMaterial.uniforms.uTexture2.value = slideTextures[1];
    shaderMaterial.uniforms.uTexture1Size.value =
      slideTextures[0].userData.size;
    shaderMaterial.uniforms.uTexture2Size.value =
      slideTextures[1].userData.size;

    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };
    render();
  };

  const handleSlideChange = () => {
    if (isTransitioning) return;

    isTransitioning = true;
    const nextIndex = (currentSlideIndex + 1) % slides.length;

    shaderMaterial.uniforms.uTexture1.value = slideTextures[currentSlideIndex];
    shaderMaterial.uniforms.uTexture2.value = slideTextures[nextIndex];
    shaderMaterial.uniforms.uTexture1Size.value =
      slideTextures[currentSlideIndex].userData.size;
    shaderMaterial.uniforms.uTexture2Size.value =
      slideTextures[nextIndex].userData.size;

    animateSlideTransition(nextIndex);

    gsap.fromTo(
      shaderMaterial.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: 2.5,
        ease: "power2.inOut",
        onComplete: () => {
          shaderMaterial.uniforms.uProgress.value = 0;
          shaderMaterial.uniforms.uTexture1.value = slideTextures[nextIndex];
          shaderMaterial.uniforms.uTexture1Size.value =
            slideTextures[nextIndex].userData.size;
        },
      }
    );
  };

  const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    shaderMaterial.uniforms.uResolution.value.set(
      window.innerWidth,
      window.innerHeight
    );
  };

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    gsap.config({ nullTargetWarn: false });

    const initSlider = async () => {
      setupInitialSlide();
      await initializeRenderer();
    };

    initSlider();

    const slider = sliderRef.current;
    slider.addEventListener("click", handleSlideChange);
    window.addEventListener("resize", handleResize);

    return () => {
      if (slider) {
        slider.removeEventListener("click", handleSlideChange);
      }
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      className="relative w-screen h-[100svh] text-white overflow-hidden"
      ref={sliderRef}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      <div className="slider-content absolute top-0 left-0 w-full h-full select-none z-20">
        {/* 主標題 H1，靠上居中 */}
        <div className="slide-title absolute top-[45%] left-1/2 -translate-x-1/2 text-center w-full">
          <h1 className="flex justify-center gap-[0.2em] text-[90px]">
            Quiet Green
          </h1>
        </div>

        {/* 其他描述文字，靠左下角對齊 */}
        <div className="slide-description absolute bottom-10 left-0 w-full px-10 md:w-1/3 flex flex-col gap-6 text-left">
          <p>
            A cinematic study of solitude, nature, and a gaze that remembers
            something forgotten.
          </p>
          <div className="slide-info uppercase">
            <p>Type. Editorial</p>
            <p>Field. Fine Art</p>
            <p>Date. 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
