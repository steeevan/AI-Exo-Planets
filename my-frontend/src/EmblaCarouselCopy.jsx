


import React, { useEffect, useState, Suspense } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { PrevButton, NextButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, useGLTF, Html } from "@react-three/drei";
import "./css/embla.css";

const EmblaCarouselCopy = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track active slide
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  // Preload all models
  useEffect(() => {
    slides.forEach((url) => useGLTF.preload(url));
  }, [slides]);

  return (
    <div className="embla-container" style={{ position: "relative", width: "100%" }}>

      <Canvas style={{ width: "100%", height: "500px" }} camera={{ position: [-10, 10, 40], fov: 50 }}>
        <ambientLight intensity={2} />
        <Suspense fallback={<Html><span style={{ color: "white" }}>Loading model...</span></Html>}>
          <Model key={slides[activeIndex]} url={slides[activeIndex]} />
        </Suspense>
        <ContactShadows scale={20} blur={10} far={20} />
        <OrbitControls />
      </Canvas>


      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((_, idx) => (
              <div
                className="embla__slide"
                key={idx}
                style={{ flex: "0 0 100%", textAlign: "center", color: "white", padding: "1rem" }}
              >
                Slide {idx + 1}
              </div>
            ))}
          </div>
        </div>


        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      </section>
    </div>
  );
};

// Model loader
function Model({ url, ...props }) {
  const { scene } = useGLTF(url, true);
  return <primitive object={scene} {...props} />;
}

export default EmblaCarouselCopy;


