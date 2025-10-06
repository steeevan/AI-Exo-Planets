import { useEffect } from "react";
import { Link } from "react-router-dom";
import Alisa from '/assets/alisa.png'
import Brista from '/assets/brista.png'
import Yanming from '/assets/yanming.png'
import Estevan from '/assets/estevan.png'
import Lily from '/assets/lily.png'
export default function MemberPage() {
   useEffect(() => {
    document.body.classList.add("member-blue");
    return () => document.body.classList.remove("member-blue");
  }, []);

  const images = [
    { id: 1, src: Estevan, alt: "Image of Estevan", header: "Estevan", paragraph: "Hello. I am Estevan and I am a team manager and a mathematician for the team. 3D modeling needs a lot of math." },
    { id: 2, src: Lily, alt: "Image of Lily", header: "Lily", paragraph: "Hello. I am Lily, and I am a backend coder on the team. 3D modeling takes a lot of iterations to fix."},
    { id: 3, src: Brista, alt: "Image of Brista", header: "Brista", paragraph: "Hello. I am Brista and I am currently in 9th grade in Diamond Bar High School. I am a coder on the team. Fixing coding errors is pain." },
    { id: 4, src: Alisa, alt: "Image of Alisa", header: "Alisa", paragraph: "Hello. I am Alisa and I am currently in 8th grade in Chaparral Middle School. I am a coder on the team. Math wasted 2 hours of my life." },
    { id: 5, src: Yanming, alt: "Image of Yanming", header: "Yanming", paragraph: "Hello. My name is Yanming and I am currently in 7th grade in Suzanne Middle School. I am a front-end programmer in the team. I'm silently working the whole time. " },
  ];

  return (
    <div>
      <header
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "2rem",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          color: "white",
          display: "flex",
          fontWeight: 700,
          paddingTop: "3rem",
          // keep your original header styling here if you had one
        }}
      >
        <h1>Team Members</h1>
      </header>

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
  );
}
