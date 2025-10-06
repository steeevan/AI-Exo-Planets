// src/Home.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import LightThing from './assets/luminescence-mark.svg'
import ExoplanetScene from './ExoplanetScene'
export default function Home() {
  // Apply background only on Home
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Link to="/new" className="link">
        Go to New Page
      </Link>

      <div>
        <Link to="/mem" className="member-page"> Go to Member Page </Link>
      </div>
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

