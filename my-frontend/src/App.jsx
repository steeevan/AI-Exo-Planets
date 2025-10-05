import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          color: "white",
          background:
            "linear-gradient(90deg, #0b1020 0%, #101a3a 50%, #0b1020 100%)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
        }}
      >
        <h1 style={{ fontSize: "1.05rem", margin: 0, letterSpacing: "0.3px" }}>
          Mapping the Unknown Universe — One Exoplanet at a Time
        </h1>
      </header>

      {/* Simple top nav (anchors) */}
      <nav
        style={{
          position: "fixed",
          top: 64,
          left: 0,
          width: "100%",
          background: "#0b1020",
          color: "white",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 9,
        }}
      >
        <ul style={{
          margin: 0, padding: "0.5rem 1rem",
          display: "flex", gap: "1rem", listStyle: "none",
          overflowX: "auto", whiteSpace: "nowrap"
        }}>
          {[
            ["what", "What"],
            ["why", "Why"],
            ["how", "How"],
            ["results", "Results"],
            ["team", "Team"],
          ].map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="toplink">{label}</a></li>
          ))}
          <li style={{ marginLeft: "auto" }}>
            <Link to="/mem" className="member-page">Team Member Page →</Link>
          </li>
        </ul>
      </nav>

      <main id="main" style={{ padding: "1.5rem", marginTop: "120px" }}>
        <Section id="what" title="What We’re Doing">
          <p>
        
          </p>
          <Bullets items={[
            
          ]}/>
        </Section>

        <Section id="why" title="Why It Matters">
          <p>
          </p>
          <Bullets items={[
            
          ]}/>
        </Section>

        <Section id="how" title="How It Works">
          <ol className="numbered">
            <li></li>
          </ol>
        </Section>


        <Section id="team" title="Team & Credits">
          <p>
            Built by the Bytewise STEM Lab team.
          </p>
        </Section>
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Bytewise STEM Lab • Exoplanet AI</small>
      </footer>
    </>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} style={{ margin: "2rem auto", maxWidth: 960 }}>
      <h2 style={{ marginBottom: "0.5rem" }}>{title}</h2>
      <div className="card">{children}</div>
    </section>
  );
}

function Bullets({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.6 }}>
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  );
}


