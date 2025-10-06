import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Make sure this is imported
import EmblaCarousel from "./EmblaCarousel";
import ExoplanetScene from "./ExoplanetScene";
import LightThing from './assets/luminescence-mark.svg'
  const HEADER_H = 96
  const NAV_H = 50
const readJsonFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        if (event.target && typeof event.target.result === "string") {
          const parsed = JSON.parse(event.target.result);
          resolve(parsed);
        } else {
          reject(new Error("FileReader result is not a string or target is null."));
        }
      } catch (error) {
        reject(new Error("Failed to parse JSON: " + error.message));
      }
    };

    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
};

function ExoplanetPage() {
  useEffect(() => {
    document.body.classList.add("member-blue");
    return () => document.body.classList.remove("member-blue");
  }, []);

  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      try {
        const parsedData = await readJsonFile(file);
        setFileContent(parsedData);
        setFileName(file.name);
      } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
        setFileContent(null);
        setFileName("");
      }
    } else {
      alert("Please upload a valid JSON file.");
      setFileContent(null);
      setFileName("");
    }
  };

  useEffect(() => {
    console.log(">>> fileContent:", fileContent);
  }, [fileContent]);

  return (
  <><header
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
          }} />
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
    </header><div className="flex flex-col gap-10">
        <h1>What are exoplanets?</h1>
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
        <h1></h1>
        {/* Upload Box */}
        <div className="mx-auto mt-8 p-6 bg-white rounded-xl shadow-2xl space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Upload Exoplanet Data</h2>
          <p className="text-gray-700">
            Upload a <span className="font-medium">.json</span> file to view exoplanets of
            your choice.
          </p>
          <p className="text-gray-600">
            Ensure it's a list of dictionaries in the following order and format:
          </p>
          <pre className="bg-gray-100 text-sm text-gray-800 p-3 rounded-md overflow-x-auto">
            {"{ planetName: 'Exoplanet A', distanceR: 5, theta: 0, phi: 90, color: 'red', planetRadiusSize: 0.5 }"}
          </pre>
          <label className="inline-block border border-blue-500 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 w-fit">
            {fileName || "Choose File"}
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>

          {fileName && (
            <p className="text-sm text-green-700">
              Selected File: <span className="font-medium">{fileName}</span>
            </p>
          )}
        </div>

        {/* Exoplanet Simulation */}
        <ExoplanetScene fileContent={fileContent} />

        {/* ✅ Go Back button at the bottom */}
        <div className="flex justify-center mt-8 mb-4">
          <Link
            to="/"
            className="member-page"
            style={{ textDecoration: "none", padding: "10px 20px" }}
          >
            Go Back
          </Link>
        </div>
      </div></>
  );
}

export default ExoplanetPage;
