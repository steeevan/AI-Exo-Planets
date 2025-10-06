import { useEffect } from "react";
import { Link } from "react-router-dom";
import Alisa from './assets/alisa.png'
import Brista from './assets/brista.png'
import Yanming from './assets/yanming.png'
import Estevan from './assets/estevan.png'
import Lily from './assets/lily.png'
import LightThing from './assets/luminescence-mark.svg'  // added import

const HEADER_H = 96;  // define header height constant

export default function MemberPage() {
  useEffect(() => {
    document.body.classList.add("member-blue");
    return () => document.body.classList.remove("member-blue");
  }, []);

  const images = [
    { id: 1, src: Estevan, alt: "Image of Estevan", header: "Estevan", paragraph: "Hello. I am Estevan and I am a team manager and a mathematician for the team. 3D modeling needs a lot of math." },
    { id: 2, src: Lily, alt: "Image of Lily", header: "Lily", paragraph: "Hello. I am Lily, and I am a backend coder on the team. 3D modeling takes a lot of iterations to fix." },
    { id: 3, src: Brista, alt: "Image of Brista", header: "Brista", paragraph: "Hello. I am Brista and I am currently in 9th grade in Diamond Bar High School. I am a coder on the team. Fixing coding errors is pain." },
    { id: 4, src: Alisa, alt: "Image of Alisa", header: "Alisa", paragraph: "Hello. I am Alisa and I am currently in 8th grade in Chaparral Middle School. I am a coder on the team. Math wasted 2 hours of my life." },
    { id: 5, src: Yanming, alt: "Image of Yanming", header: "Yanming", paragraph: "Hello. My name is Yanming and I am currently in 7th grade in Suzanne Middle School. I am a front-end programmer in the team. I'm silently working the whole time. " },
  ];

  return (
    <>
      <div>
        {/* Fixed header */}
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

            <div style={{ flex: "0 0 auto" }}>
              <Link to="/" className="member-page">Home</Link>
            </div>

            <div className="flex flex-row gap-3">
              <div style={{ flex: "0 0 auto" }}>
                <Link to="/test" className="member-page">3D Exoplanets Carousel</Link>
              </div>
              <div style={{ flex: "0 0 auto" }}>
                <Link to="/mem" className="member-page">Team Member Page</Link>
              </div>
            </div>

          </div>
        </nav>

        {/* Page header or title */}
        <div style={{ paddingTop: `${HEADER_H + 60}px`, textAlign: "center" }}>
          <h1>Team Members</h1>
        </div>

        <main style={{ padding: "1rem", marginTop: "3rem" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "space-evenly",
              fontWeight: 500,
            }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#222",
                  borderRadius: "10px",
                  padding: "10px",
                  width: "400px",
                  boxSizing: "border-box",
                }}
              >
                <h3
                  style={{
                    color: "white",
                    marginBottom: "10px",
                    fontSize: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  {image.header}
                </h3>

                <div style={{ width: "100%" }}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      width: "100%",
                      height: "475px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />

                  <div
                    style={{
                      border: "2px solid white",
                      padding: "10px",
                      borderRadius: "5px",
                      marginTop: "10px",
                      textAlign: "center",
                      color: "white",
                      fontSize: "1.5rem",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    {image.paragraph}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to="/" className="link">
              Go Back
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
