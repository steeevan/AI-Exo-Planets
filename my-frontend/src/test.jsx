
import { useState, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Auto-fitting 3D model
function Model({ url }) {
  const { scene } = useGLTF(url);

  // Compute bounding box and scale to fit
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    return 2 / maxDim; // adjust multiplier to fit nicely
  }, [scene]);

  // Center model
  const center = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    return [-center.x, -center.y, -center.z];
  }, [scene]);

  return <primitive object={scene} scale={scale} position={center} />;
}

export default function Controlled3D() {
  const [index, setIndex] = useState(0);

  const slides = [
    { url: "src/assets/pixel_planet_hd-17156-b.glb", label: "HD-17156b" },
    { url: "src/assets/pixel_planet_55_cancri_e.glb", label: "55 Cancri E" },
    { url: "src/assets/pixel_planet_kepler-22-b.glb", label: "Kepler-22b" },
    { url: "src/assets/pixel_planet_hd-40307-g.glb", label: "HD-40307G" },
    { url: "src/assets/pixel_planet_kepler-16_b.glb", label: "Kepler-16B" },
    { url: "src/assets/pixel_planet_kepler-37-b.glb", label: "Kepler-37B" },
    { url: "src/assets/pixel_planet_kepler-186-f.glb", label: "Kepler-186F" },
    { url: "src/assets/pixel_planet_proxima_centauri_b.glb", label: "Proxima Centauri B" },
    { url: "src/assets/pixel_planet_toi-849_b.glb", label: "Toi-849 B" },
    { url: "src/assets/pixel_planet_trappist-1-e.glb", label: "Trappist-1E" },


  ];

  const prevSlide = () => setIndex((index - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((index + 1) % slides.length);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000", position: "relative" }}>

      {slides.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: index === i ? "block" : "none",
          }}
        >
          <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
            <ambientLight intensity={1.0} />
            <directionalLight position={[2, 2, 2]} />
            <OrbitControls enableZoom={true} />
            <Suspense fallback={null}>
              <Model url={slide.url} />
            </Suspense>
          </Canvas>


          <div
            style={{
              position: "absolute",
              bottom: "20px",
              width: "100%",
              textAlign: "center",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            {slide.label}
          </div>
        </div>
      ))}


      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          zIndex: 10,
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          zIndex: 10,
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
}


