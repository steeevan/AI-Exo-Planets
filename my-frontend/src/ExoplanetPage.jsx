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
      <p>Exoplanets are planets that orbit stars outside our solar system. Planets are rocky icy or gaseous bodies that do not radiate light, and orbit a star.
        They also clear their orbital path, and need to have enough gravity to be in a spherical shape,
        from hydrostatic equilibrium. We often find exoplanets by the periodic dimming of stars.
        This works because when the planet passes in front of the star it blocks the light, so you are able to calculate orbital period from that aswell.
        Another way is radial velocity. We are checking to see if the star's movement seems to be affected by an exoplanet.
        It gives it red shift or blue shift depending on the direction of the star's movement relative to us, from the Doppler effect.
      </p>
      <ModelScene position={[0, 0, 0]} size={[1, 1, 1]} color={"red"} />
    </div>
  )
};

export default ExoplanetPage;