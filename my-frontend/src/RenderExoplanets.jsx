import EmblaCarousel from "./EmblaCarousel";
import ModelScene from "./ModelScene";

function RenderExoplanets() {

  const OPTIONS = { dragFree: true, loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const IMAGES123 = [
    "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    "https://flowbite.com/docs/images/carousel/carousel-3.svg",
    "https://flowbite.com/docs/images/carousel/carousel-4.svg",
    "https://flowbite.com/docs/images/carousel/carousel-5.svg",
  ];

  // useEffect(() => {
  //   console.log(">>> IMAGES:", IMAGES);
  // }, []);

  return (<div>
      <EmblaCarousel slides={IMAGES123} options={OPTIONS} />
      <p> </p>
      
    </div>
  )
};

export default RenderExoplanets;