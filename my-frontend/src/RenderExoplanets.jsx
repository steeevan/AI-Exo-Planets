import EmblaCarousel from "./EmblaCarousel";
import { Link } from "react-router-dom";

function RenderExoplanets() {
  const OPTIONS = { dragFree: true, loop: true };
  const IMAGES123 = [
    "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    "https://flowbite.com/docs/images/carousel/carousel-3.svg",
    "https://flowbite.com/docs/images/carousel/carousel-4.svg",
    "https://flowbite.com/docs/images/carousel/carousel-5.svg",
  ];

  return (
    <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
      {/* Carousel */}
      <EmblaCarousel slides={IMAGES123} options={OPTIONS} />

      {/* Spacer */}
      <div style={{ height: "1rem" }} />

      {/* Centered button */}
      <div style={{ flex: "0 0 auto" }}>
        <Link to="/" className="member-page">
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default RenderExoplanets;
