// src/Home.jsx
import { useEffect } from 'react'
import './App.css'
import ExoplanetScene from './ExoplanetScene'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
export default function Home() {
  // Apply background only on Home
  useEffect(() => {
    document.body.classList.add('home-bg')
    return () => document.body.classList.remove('home-bg')
  }, [])

  const HEADER_H = 96
  const NAV_H = 50

  return (
    <div className='min-h-screen flex flex-col items-center'>
      <a href="#main" className="skip-link">Skip to content</a>

      {/* HEADER */}
      <HeaderComponent />

      {/* MAIN CONTENT */}
      <main id="main" style={{ padding: "0.75rem", marginTop: `${HEADER_H + NAV_H - 50}px`, width: "80vw" }}>
        <div className='bg-[#b8b7b752] rounded-3xl backdrop-blur-[20px]'>
          <Section id="project overview" title="What We’re Doing">
            <p className="gray-box">Exo-Existence is a web application that visualizes exoplanets in 3D simulations using real NASA data and employs AI to identify potential new exoplanets.</p>
          </Section>
          <Section id="project overview" title="Why It Matters">
            <p className="gray-box">Our project makes exoplanet exploration interactive and educational, aiding scientists, students, and enthusiasts in discovering and understanding distant worlds.</p>
          </Section>
          <Section id="project overview" title="How It Works">
            <p className="gray-box">Users can upload CSV or JSON files with exoplanet data to render 3D orbital simulations, explore detailed planet information, and use our AI model to classify potential exoplanets.</p>
          </Section>
        </div>

        <div className='bg-[#b8b7b742] rounded-3xl backdrop-blur-[20px]'>
          <Section id="simulation" title="Simulation (3D Demo)">
            <p className="gray-box">Simple 3D scene with orbit controls and exoplanets.</p>
            <div className="section-bg section-bg--cover w-[100%] justify-center items-center">
              <ExoplanetScene></ExoplanetScene>
            </div>
          </Section>
        </div>
      </main>

      {/* FOOTER */}
      <FooterComponent />
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} style={{ margin: "2rem auto", maxWidth: 960 }}>
      <h2
        className="gray-box-hd"
        style={{
          margin: 0,
          marginBottom: "0.25rem",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "white"
        }}
      >
        {title}
      </h2>
      <div className="card">{children}</div>
    </section>
  );
}