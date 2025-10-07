import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExoplanetScene from "./ExoplanetScene";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import presetExoplanetData from "../public/assets/presetExoplanetsData.json";

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
  const HEADER_H = 96;
  const NAV_H = 50;
  const FIXED_OFFSET = HEADER_H + NAV_H;

  useEffect(() => {
    document.body.classList.add("member-blue");
    return () => document.body.classList.remove("member-blue");
  }, []);

  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      try {
        const parsedData = await readJsonFile(file);
        setFileContent(parsedData);
        setFileName(file.name);
        setSelectedPreset(""); // Clear preset selection when file is uploaded
      } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
        setFileContent(null);
        setFileName("");
        alert("Error reading JSON file. Please check the format and try again.");
      }
    } else {
      alert("Please upload a valid JSON file.");
      setFileContent(null);
      setFileName("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      const input = document.createElement('input');
      input.type = 'file';
      input.files = e.dataTransfer.files;
      const event = new Event('change', { bubbles: true });
      input.dispatchEvent(event);
      handleFileChange({ target: { files: [file] } });
    } else {
      alert("Please drop a valid JSON file.");
    }
  };

  const handlePresetSelect = (presetName) => {
    const preset = presetExoplanetData.find(item => item[presetName]);
    if (preset) {
      setFileContent(preset[presetName]);
      setSelectedPreset(presetName);
      setFileName(""); // Clear file name when preset is selected
    }
  };

  const clearData = () => {
    setFileContent("");
    setFileName("");
    setSelectedPreset("");
  };

  return (
    <div style={{ backgroundColor: "#0c1525", minHeight: "100vh" }}>
      <HeaderComponent />

      {/* Hero Section */}
      <div
        style={{
          paddingTop: `${FIXED_OFFSET + 60}px`,
          textAlign: "center",
          background: "linear-gradient(135deg, #0c1525 0%, #447894 100%)",
          paddingBottom: "60px",
          marginBottom: "40px"
        }}
      >
        <h1 style={{
          color: "#64dcdc",
          fontSize: "3rem",
          fontWeight: "700",
          margin: "0 0 1rem 0",
          textShadow: "0 2px 10px rgba(114, 212, 243, 0.3)",
          letterSpacing: "1px"
        }}>
          Exoplanet Simulation
        </h1>
        <p style={{
          color: "#72d4f3",
          fontSize: "1.3rem",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.6",
          opacity: 0.9
        }}>
          Visualize the vast distances of exoplanets in our galaxy. Upload your data or try our preset datasets.
        </p>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Information Section */}
        <div style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          padding: "2.5rem",
          marginBottom: "3rem",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
        }}>
          <h3 style={{
            color: "#64dcdc",
            fontSize: "1.8rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "600"
          }}>
            How It Works
          </h3>
          <p style={{
            color: "#ffffff",
            fontSize: "1.1rem",
            lineHeight: "1.7",
            textAlign: "center",
            marginBottom: "1.5rem"
          }}>
            Our simulation displays the relative positions of exoplanets based on astronomical data.
            We calculate distances by converting parsecs to astronomical units (AU) using the conversion factor:
            <strong style={{ color: "#72d4f3" }}> 1 parsec = 206,265 AU</strong>.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginTop: "2rem"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#72d4f3",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "1.5rem",
                color: "#0c1525",
                fontWeight: "bold"
              }}>1</div>
              <h4 style={{ color: "#64dcdc", marginBottom: "0.5rem" }}>Choose Data</h4>
              <p style={{ color: "#ffffff", fontSize: "0.9rem" }}>Upload your data or select a preset dataset</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#3c8c8c",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "1.5rem",
                color: "#0c1525",
                fontWeight: "bold"
              }}>2</div>
              <h4 style={{ color: "#64dcdc", marginBottom: "0.5rem" }}>Processing</h4>
              <p style={{ color: "#ffffff", fontSize: "0.9rem" }}>We convert and calculate positions</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#64dcdc",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "1.5rem",
                color: "#0c1525",
                fontWeight: "bold"
              }}>3</div>
              <h4 style={{ color: "#64dcdc", marginBottom: "0.5rem" }}>Visualize</h4>
              <p style={{ color: "#ffffff", fontSize: "0.9rem" }}>Explore the 3D simulation</p>
            </div>
          </div>
        </div>

        {/* JSON Format Reference */}
        <div style={{
          backgroundColor: "rgba(12, 21, 37, 0.6)",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "3rem",
          border: "1px solid #3c8c8c"
        }}>
          <h4 style={{ color: "#64dcdc", marginBottom: "1rem", fontSize: "1.2rem", textAlign: "center" }}>
            Required JSON Format:
          </h4>
          <pre style={{
            backgroundColor: "rgba(60, 140, 140, 0.1)",
            color: "#72d4f3",
            padding: "1.5rem",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "0.9rem",
            border: "1px solid #3c8c8c",
            margin: 0
          }}>
            {`{
  "planetName": "Exoplanet A",
  "distanceR": 5,
  "theta": 0,
  "phi": 90,
  "color": "red",
  "planetRadiusSize": 0.5
}`}
          </pre>
        </div>

        {/* Data Selection Section */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem"
        }}>
          {/* Upload Section */}
          <div style={{
            background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
            borderRadius: "20px",
            padding: "2rem",
            border: `2px dashed ${isDragOver ? "#72d4f3" : "#447894"}`,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <h3 style={{
              color: "#64dcdc",
              fontSize: "1.5rem",
              marginBottom: "1rem",
              textAlign: "center",
              fontWeight: "600"
            }}>
              Upload Custom Data
            </h3>

            <p style={{
              color: "#72d4f3",
              textAlign: "center",
              marginBottom: "1.5rem",
              fontSize: "1rem"
            }}>
              Upload your own <strong style={{ color: "#64dcdc" }}>.json</strong> file
            </p>

            <div style={{ textAlign: "center" }}>
              <label style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "transparent",
                color: "#72d4f3",
                border: "2px solid #72d4f3",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "all 0.3s ease",
                marginBottom: "1rem"
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
                <span>📁</span>
                {fileName || "Choose JSON File"}
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".json"
                  style={{ display: "none" }}
                />
              </label>

              {fileName && (
                <div style={{
                  color: "#64dcdc",
                  fontSize: "0.9rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(100, 220, 220, 0.1)",
                  borderRadius: "15px",
                  border: "1px solid #64dcdc",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  <span>✅</span>
                  Selected: <strong>{fileName}</strong>
                </div>
              )}

              <p style={{
                color: "#72d4f3",
                marginTop: "1rem",
                fontSize: "0.8rem",
                opacity: 0.8
              }}>
                or drag and drop your JSON file here
              </p>
            </div>
          </div>

          {/* Preset Data Section */}
          <div style={{
            background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
            borderRadius: "20px",
            padding: "2rem",
            border: "1px solid #447894",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            position: "relative",
            overflow: "hidden"
          }}>
            <h3 style={{
              color: "#64dcdc",
              fontSize: "1.5rem",
              marginBottom: "1rem",
              textAlign: "center",
              fontWeight: "600"
            }}>
              Try Preset Data
            </h3>

            <p style={{
              color: "#72d4f3",
              textAlign: "center",
              marginBottom: "1.5rem",
              fontSize: "1rem"
            }}>
              Explore with our sample exoplanet datasets
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "0.75rem"
            }}>
              {presetExoplanetData.map((preset, index) => {
                const presetName = Object.keys(preset)[0];
                return (
                  <button
                    key={presetName}
                    onClick={() => handlePresetSelect(presetName)}
                    style={{
                      padding: "0.75rem 0.5rem",
                      backgroundColor: selectedPreset === presetName
                        ? "rgba(114, 212, 243, 0.2)"
                        : "rgba(60, 140, 140, 0.1)",
                      color: selectedPreset === presetName ? "#72d4f3" : "#64dcdc",
                      border: selectedPreset === presetName
                        ? "2px solid #72d4f3"
                        : "1px solid #3c8c8c",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.25rem"
                    }}
                    onMouseEnter={(e) => {
                      if (selectedPreset !== presetName) {
                        e.currentTarget.style.backgroundColor = "rgba(114, 212, 243, 0.15)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedPreset !== presetName) {
                        e.currentTarget.style.backgroundColor = "rgba(60, 140, 140, 0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>🪐</span>
                    {presetName}
                    <span style={{
                      fontSize: "0.7rem",
                      opacity: 0.8,
                      color: selectedPreset === presetName ? "#72d4f3" : "#64dcdc"
                    }}>
                      {preset[presetName].length} exoplanets
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Selection Display */}
        {(fileName || selectedPreset) && (
          <div style={{
            background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
            borderRadius: "15px",
            padding: "1.5rem",
            marginBottom: "2rem",
            border: "1px solid #3c8c8c",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            textAlign: "center"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap"
            }}>
              <span style={{
                color: "#72d4f3",
                fontSize: "1rem",
                fontWeight: "600"
              }}>
                Currently viewing:
              </span>
              <span style={{
                color: "#64dcdc",
                fontSize: "1.1rem",
                fontWeight: "700",
                backgroundColor: "rgba(100, 220, 220, 0.1)",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                border: "1px solid #64dcdc"
              }}>
                {fileName || selectedPreset}
              </span>
              <button
                onClick={clearData}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "transparent",
                  color: "#72d4f3",
                  border: "1px solid #72d4f3",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(114, 212, 243, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Clear Data
              </button>
            </div>
          </div>
        )}

        {/* Exoplanet Simulation */}
        <div style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          padding: "2rem",
          marginBottom: "3rem",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <h3 style={{
              color: "#64dcdc",
              fontSize: "1.8rem",
              fontWeight: "600",
              margin: 0
            }}>
              3D Visualization
            </h3>
            {!fileContent && (
              <div style={{
                color: "#72d4f3",
                fontSize: "1rem",
                fontStyle: "italic",
                opacity: 0.8
              }}>
                Upload data or select a preset to begin
              </div>
            )}
          </div>
          <ExoplanetScene fileContent={fileContent} />
        </div>

        {/* Go Back Button */}
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
      </div>

      <FooterComponent />
    </div>
  );
}

export default ExoplanetPage;