import { Link } from "react-router-dom";

export default function MemberPage() {
  const images = [
    { id: 1, src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png", alt: "Image of Estevan", header: "Estevan", paragraph: "T" },
    { id: 2, src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png", alt: "Image of Lily", header: "Lily", paragraph: "A" },
    { id: 3, src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png", alt: "Image of Brista", header: "Brista", paragraph: "F" },
    { id: 4, src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png", alt: "Image of Alisa", header: "Alisa", paragraph: "e" },
    { id: 5, src: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png", alt: "Image of Yanming", header: "Yanming", paragraph: "tq" },
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
        }}
      >
        <h1>Member Page</h1>
      </header>

      <main style={{ padding: "1rem", marginTop: "1rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
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
                backgroundColor: "#222",
                borderRadius: "10px",
                padding: "10px",
                width: "300px",
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
                    height: "300px",
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
                    fontSize: "25px",
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
