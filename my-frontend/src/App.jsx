// src/Home.jsx
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import LightThing from './assets/luminescence-mark.svg'
import ExoplanetScene from './ExoplanetScene'

export default function Home() {
  useEffect(() => {
    document.body.classList.add('home-bg')
    return () => document.body.classList.remove('home-bg')
  }, [])

  function scrollToSectionCenter(id) {
    const el = document.getElementById(id)
    if (!el) return
    const headerH = document.getElementById('site-header')?.offsetHeight || 0
    const navH = document.getElementById('site-nav')?.offsetHeight || 0
    const fixedOffset = headerH + navH
    const rect = el.getBoundingClientRect()
    const absTop = rect.top + window.scrollY
    const available = window.innerHeight - fixedOffset
    const desiredTop = absTop - Math.max(0, (available - el.offsetHeight) / 2) - fixedOffset
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const clamped = Math.max(0, Math.min(desiredTop, maxScroll))
    window.scrollTo({ top: clamped, behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  const HEADER_H = 96
  const NAV_H = 50

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      {/* HEADER */}
      <header
        id="site-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: `${HEADER_H}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 16px 0",
          zIndex: 10,
          color: "white",
          background: "linear-gradient(90deg, #0b1020 0%, #101a3a 50%, #0b1020 100%)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img
            src={LightThing}
            alt="Luminescence logo"
            style={{
              height: 100,
              width: "auto",
              display: "block",
            }}
          />
          <span style={{ fontWeight: 700, fontSize: "1.5rem", lineHeight: 1 }}>
            Exo-Existence
          </span>
        </div>

        <h1
          style={{
            fontSize: "1.6rem",
            margin: 0,
            letterSpacing: "0.3px",
            fontWeight: 800,
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          Mapping the Unknown Universe — One Exoplanet at a Time
        </h1>
      </header>

      {/* NAV */}
      <nav
        id="site-nav"
        style={{
          position: "fixed",
          top: HEADER_H,
          left: 0,
          width: "100%",
          background: "#0b1020",
          color: "white",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 9,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "44px",
            padding: "0 0.75rem",
            gap: "0.75rem",
          }}
        >
          <ul
            style={{
              margin: 0,
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              listStyle: "none",
              overflowX: "auto",
              whiteSpace: "nowrap",
              fontSize: "1.1rem",
              flex: "1 1 0",
              minWidth: 0,
            }}
          >
            {[
              ["what-we-are-doing", "Project Overview"],
              ["simulation", "Simulation"],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="toplink"
                  onClick={(e) => { e.preventDefault(); scrollToSectionCenter(id); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ flex: "0 0 auto" }}>
            <Link to="/exoplanetinfo" className="member-page">Exoplanet Info</Link>
          </div>

          <div style={{ flex: "0 0 auto" }}>
            <Link to="/mem" className="member-page">Team Member Page</Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main id="main" style={{ padding: "0.75rem", marginTop: `${HEADER_H + NAV_H - 50}px` }}>

        {/* GROUPED SECTIONS IN ONE BIG GRAY BOX */}
        <div className="gray-box" style={{ margin: "2rem auto", maxWidth: 960 }}>
          <Section id="what-we-are-doing" title="What We’re Doing">
            <p>We are making an exoplanet renderer using 3D models and simulations.</p>
          </Section>

          <Section id="why-it-matters" title="Why It Matters">
            <p>We are doing this because we want to help with finding exoplanets more easily.</p>
          </Section>

          <Section id="how-it-works" title="How It Works">
            <p>
              You can look at the 3D model simulation, insert a JSON file, and then
              you will see the exoplanets on the simulation. You can also change
              the settings for it and move the camera around.
            </p>
          </Section>
        </div>

        {/* SIMULATION DESCRIPTION INSIDE BOX */}
        <div className="gray-box" style={{ marginTop: "1rem", maxWidth: 960 }}>
          <Section id="simulation" title="Simulation (3D Demo)">
            <p>Simple 3D scene with orbit controls and exoplanets.</p>
          </Section>
        </div>

        {/* 3D Simulation OUTSIDE BOX */}
        <ExoplanetScene />

        {/* TEAM SECTION INSIDE BOX */}
        <div className="gray-box" style={{ marginTop: "1rem", maxWidth: 960 }}>
          <Section id="team" title="Team & Credits">
            <p>Built by the Luminescence team.</p>
          </Section>
        </div>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Luminescence • Exoplanet AI</small>
      </footer>
    </>
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
