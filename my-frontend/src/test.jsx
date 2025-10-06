import { useState, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Link } from 'react-router-dom'
import LightThing from './assets/luminescence-mark.svg'
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import samplePlanet1 from "./assets/pixel_planet_hd-17156-b.glb";
import samplePlanet2 from "./assets/pixel_planet_55_cancri_e.glb";
import samplePlanet3 from "./assets/pixel_planet_kepler-22-b.glb";
import samplePlanet4 from "./assets/pixel_planet_hd-40307-g.glb";
import samplePlanet5 from "./assets/pixel_planet_kepler-16_b.glb";
import samplePlanet6 from "./assets/pixel_planet_kepler-37-b.glb";
import samplePlanet7 from "./assets/pixel_planet_kepler-186-f.glb";
import samplePlanet8 from "./assets/pixel_planet_proxima_centauri_b.glb";
import samplePlanet9 from "./assets/pixel_planet_toi-849_b.glb";
import samplePlanet10 from "./assets/pixel_planet_trappist-1-e.glb";

const HEADER_H = 96
const NAV_H = 50

// Auto-fitting 3D model
function Model({ url }) {
  const { scene } = useGLTF(url);

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    return 2 / maxDim;
  }, [scene]);

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
    { url: samplePlanet1, label: "HD-17156b" },
    { url: samplePlanet2, label: "55 Cancri E" },
    { url: samplePlanet3, label: "Kepler-22b" },
    { url: samplePlanet4, label: "HD-40307G" },
    { url: samplePlanet5, label: "Kepler-16B" },
    { url: samplePlanet6, label: "Kepler-37B" },
    { url: samplePlanet7, label: "Kepler-186F" },
    { url: samplePlanet8, label: "Proxima Centauri B" },
    { url: samplePlanet9, label: "TOI-849 B" },
    { url: samplePlanet10, label: "Trappist-1E" },
  ];

  const prevSlide = () => setIndex((index - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((index + 1) % slides.length);

  return (
    <div style={{ backgroundColor: "#0c1525", minHeight: "100vh" }}>
      <HeaderComponent />

      {/* Hero Section */}
      <div style={{
        paddingTop: `${HEADER_H + 60}px`,
        textAlign: "center",
        background: "linear-gradient(135deg, #0c1525 0%, #447894 100%)",
        paddingBottom: "40px",
        marginBottom: "0"
      }}>
        <h1 style={{
          color: "#64dcdc",
          fontSize: "3rem",
          fontWeight: "700",
          margin: "0 0 1rem 0",
          textShadow: "0 2px 10px rgba(114, 212, 243, 0.3)",
          letterSpacing: "1px"
        }}>
          3D Planet Explorer
        </h1>
        <p style={{
          color: "#72d4f3",
          fontSize: "1.2rem",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.6",
          opacity: 0.9
        }}>
          Explore detailed 3D models of fascinating exoplanets discovered throughout our galaxy
        </p>
      </div>

      {/* Instructions Panel */}
      <div style={{
        background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
        padding: "2rem",
        margin: "2rem auto",
        maxWidth: "800px",
        borderRadius: "20px",
        border: "1px solid #3c8c8c",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        textAlign: "center"
      }}>
        <h3 style={{
          color: "#64dcdc",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          fontWeight: "600"
        }}>
          How to Explore
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          color: "#ffffff"
        }}>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🖱️</div>
            <p>Click & Drag to Rotate</p>
          </div>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
            <p>Scroll to Zoom</p>
          </div>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⬅️➡️</div>
            <p>Use Arrows to Navigate</p>
          </div>
        </div>
      </div>

      {/* Main 3D Viewer Container */}
      <div style={{
        position: "relative",
        width: "100vw",
        height: "70vh",
        background: "linear-gradient(180deg, #0c1525 0%, #1a2a3a 50%, #0c1525 100%)",
        overflow: "hidden"
      }}>

        {/* Planet Cards */}
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
              <directionalLight position={[2, 2, 2]} color="#72d4f3" />
              <pointLight position={[0, 0, 0]} intensity={0.5} color="#64ddcc" />
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                minDistance={2}
                maxDistance={10}
              />
              <Suspense fallback={null}>
                <Model url={slide.url} />
              </Suspense>
            </Canvas>

            {/* Simplified Planet Label */}
            <div
              style={{
                position: "absolute",
                bottom: "40px",
                width: "100%",
                textAlign: "center",
                color: "white",
                fontSize: "2rem",
                fontWeight: "600",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                zIndex: 10
              }}
            >
              {slide.label}
            </div>

            {/* Slide Counter */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(12, 21, 37, 0.8)",
                backdropFilter: "blur(10px)",
                color: "#72d4f3",
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "15px",
                border: "1px solid #3c8c8c",
                zIndex: 5
              }}
            >
              {index + 1} / {slides.length}
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            zIndex: 10,
            padding: "1rem 1.2rem",
            fontSize: "1.2rem",
            cursor: "pointer",
            backgroundColor: "rgba(12, 21, 37, 0.8)",
            backdropFilter: "blur(10px)",
            color: "#72d4f3",
            border: "2px solid #72d4f3",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#72d4f3";
            e.currentTarget.style.color = "#0c1525";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(12, 21, 37, 0.8)";
            e.currentTarget.style.color = "#72d4f3";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          ←
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: "absolute",
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
            zIndex: 10,
            padding: "1rem 1.2rem",
            fontSize: "1.2rem",
            cursor: "pointer",
            backgroundColor: "rgba(12, 21, 37, 0.8)",
            backdropFilter: "blur(10px)",
            color: "#72d4f3",
            border: "2px solid #72d4f3",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#72d4f3";
            e.currentTarget.style.color = "#0c1525";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(12, 21, 37, 0.8)";
            e.currentTarget.style.color = "#72d4f3";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
          }}
        >
          →
        </button>
      </div>


      {/* Back to Home Button */}
      <div style={{ textAlign: "center", margin: "3rem 0" }}>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem 2rem",
            backgroundColor: "transparent",
            color: "#72d4f3",
            textDecoration: "none",
            borderRadius: "25px",
            border: "2px solid #72d4f3",
            fontSize: "1.1rem",
            fontWeight: "600",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#72d4f3";
            e.currentTarget.style.color = "#0c1525";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#72d4f3";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ← Back to Home
        </Link>
      </div>

      <FooterComponent />
    </div>
  );
}