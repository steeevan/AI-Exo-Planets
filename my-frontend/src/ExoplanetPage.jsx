import { useEffect } from "react";
import EmblaCarousel from "./EmblaCarousel";
import ModelScene from "./ModelScene";

function ExoplanetPage() {

  const OPTIONS = { dragFree: true, loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const IMAGES = [
    "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    "https://flowbite.com/docs/images/carousel/carousel-3.svg",
    "https://flowbite.com/docs/images/carousel/carousel-4.svg",
    "https://flowbite.com/docs/images/carousel/carousel-5.svg",
  ];

  // useEffect(() => {
  //   console.log(">>> IMAGES:", IMAGES);
  // }, []);

  return (
    <div className="flex flex-col gap-14">
      <h1>What are exoplanets?</h1>
      <EmblaCarousel slides={IMAGES} options={OPTIONS} />
      <p>paragraph paragraph paragraph paragraph paragraph paragraph paragraph
        paragraph paragraph paragraph paragraph paragraph paragraph paragraph
        paragraph paragraph paragraph paragraph paragraph paragraph paragraph
        paragraph paragraph paragraph paragraph paragraph paragraph paragraph
        paragraph paragraph paragraph paragraph paragraph paragraph paragraph
      </p>
      <ModelScene position={[0, 0, 0]} size={[1, 1, 1]} color={"red"} />
    </div>
  )
};

export default ExoplanetPage;