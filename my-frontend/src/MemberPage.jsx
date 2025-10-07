import { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

const HEADER_H = 96;

export default function MemberPage() {
  useEffect(() => {
    document.body.classList.add("member-blue");
    return () => document.body.classList.remove("member-blue");
  }, []);

  const images = [
    { id: 1, src: './assets/estevan.png', alt: "Image of Estevan", header: "Estevan", paragraph: "Hello. I am Estevan and I am a team manager and a mathematician for the team. 3D modeling needs a lot of math." },
    { id: 2, src: './assets/lily.png', alt: "Image of Lily", header: "Lily", paragraph: "Hello. I am Lily, and I am a backend coder on the team. 3D modeling takes a lot of iterations to fix." },
    { id: 3, src: './assets/brista.png', alt: "Image of Brista", header: "Brista", paragraph: "Hello. I am Brista and I am currently in 9th grade in Diamond Bar High School. I am a coder on the team. Fixing coding errors is pain." },
    { id: 4, src: './assets/alisa.png', alt: "Image of Alisa", header: "Alisa", paragraph: "Hello. I am Alisa and I am currently in 8th grade in Chaparral Middle School. I am a coder on the team. Math wasted 2 hours of my life." },
    { id: 5, src: './assets/yanming.png', alt: "Image of Yanming", header: "Yanming", paragraph: "Hello. My name is Yanming and I am currently in 7th grade in Suzanne Middle School. I am a front-end programmer in the team. I'm silently working the whole time. " },
  ];

  return (
    <>
      <div style={{ backgroundColor: "#0c1525", minHeight: "100vh" }}>
        <HeaderComponent />

        {/* Page header with gradient */}
        <div style={{
          paddingTop: `${HEADER_H + 80}px`,
          textAlign: "center",
          background: "linear-gradient(135deg, #0c1525 0%, #447894 100%)",
          paddingBottom: "60px",
          marginBottom: "40px"
        }}>
          <h1 style={{
            color: "#64dcdc",
            fontSize: "3rem",
            fontWeight: "700",
            margin: 0,
            textShadow: "0 2px 10px rgba(114, 212, 243, 0.3)",
            letterSpacing: "1px"
          }}>
            Team Members
          </h1>
          <p style={{
            color: "#72d4f3",
            fontSize: "1.2rem",
            marginTop: "1rem",
            opacity: 0.9
          }}>
            Meet the talented individuals behind our project
          </p>
        </div>

        <main style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
              justifyContent: "center",
            }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
                  borderRadius: "20px",
                  padding: "20px",
                  boxSizing: "border-box",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  border: "1px solid #3c8c8c",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(114, 212, 243, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
                }}
              >
                {/* Decorative accent */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: "linear-gradient(90deg, #72d4f3, #64dcdc, #3c8c8c)",
                  borderRadius: "20px 20px 0 0"
                }} />

                <h3
                  style={{
                    color: "#64dcdc",
                    marginBottom: "15px",
                    fontSize: "1.5rem",
                    textAlign: "center",
                    fontWeight: "600",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                    zIndex: 1
                  }}
                >
                  {image.header}
                </h3>

                <div style={{
                  width: "100%",
                  position: "relative"
                }}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      borderRadius: "10px",
                      border: "2px solid #447894",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "black",
                    }}
                  />

                  <div
                    style={{
                      background: "rgba(12, 21, 37, 0.9)",
                      border: "1px solid #72d4f3",
                      padding: "15px",
                      borderRadius: "8px",
                      marginTop: "15px",
                      textAlign: "center",
                      color: "#ffffff",
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                      width: "100%",
                      boxSizing: "border-box",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 4px 12px rgba(114, 212, 243, 0.1)"
                    }}
                  >
                    {image.paragraph}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: "center",
            marginTop: "60px",
            marginBottom: "40px"
          }}>
            <Link
              to="/"
              style={{
                display: "inline-block",
                padding: "12px 30px",
                backgroundColor: "transparent",
                color: "#72d4f3",
                textDecoration: "none",
                borderRadius: "25px",
                border: "2px solid #72d4f3",
                fontSize: "1.1rem",
                fontWeight: "600",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden"
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
              ← Go Back to Home
            </Link>
          </div>
        </main>

        <FooterComponent />
      </div>
    </>
  );
}