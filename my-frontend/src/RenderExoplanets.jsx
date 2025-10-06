

// RenderExoplanets.jsx
import React from "react";
import EmblaCarouselCopy from "./EmblaCarouselCopy.jsx";


const RenderExoplanets = () => {
  const slides = [
    "/assets/55_Cancri_e_1_24364.glb",
    "/assets/pixel_planet_kepler_22-b.glb",
    "/assets/Proxima_b_1_13776.glb",
    "/assets/WASP-12b_1_249888.glb",
  ];

  const OPTIONS = { dragFree: true, loop: true };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white", marginBottom: "1rem" }}>
        Exoplanet 3D Carousel
      </h2>
      <EmblaCarouselCopy slides={slides} options={OPTIONS} />
    </div>
  );
};

export default RenderExoplanets;
