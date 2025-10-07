import { Link } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

const HEADER_H = 96;

export default function MLDetails() {
  return (
    <div style={{ backgroundColor: "#0c1525", minHeight: "100vh" }}>
      <HeaderComponent />
      <div className="ml-page" style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto", paddingTop: `${HEADER_H + 80}px`, }}>

        {/* HERO */}
        <header style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "25px",
          padding: "4rem 3rem",
          marginBottom: "3rem",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "3rem"
        }}>
          <div style={{ flex: 1, zIndex: 2 }}>
            <h1 style={{
              color: "#64dcdc",
              fontSize: "3rem",
              fontWeight: "700",
              margin: "0 0 1rem 0",
              textShadow: "0 2px 10px rgba(114, 212, 243, 0.3)",
              letterSpacing: "0.5px"
            }}>
              How Our Exoplanet ML Works
            </h1>
            <p style={{
              color: "#72d4f3",
              fontSize: "1.2rem",
              lineHeight: "1.6",
              marginBottom: "2rem",
              opacity: 0.9
            }}>
              A transparent view of our end to end pipeline. We transform raw Kepler/TESS light curves into
              candidate classifications and confident confirmations.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                to="/machine-learning"
                style={{
                  padding: "1rem 2rem",
                  backgroundColor: "#72d4f3",
                  color: "#0c1525",
                  textDecoration: "none",
                  borderRadius: "25px",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  border: "2px solid #72d4f3",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#72d4f3";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#72d4f3";
                  e.currentTarget.style.color = "#0c1525";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Open Exo Catalog
              </Link>
              <a
                href="#pipeline"
                style={{
                  padding: "1rem 2rem",
                  backgroundColor: "transparent",
                  color: "#72d4f3",
                  textDecoration: "none",
                  borderRadius: "25px",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  border: "2px solid #72d4f3",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#72d4f3";
                  e.currentTarget.style.color = "#0c1525";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#72d4f3";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Jump to Pipeline
              </a>
            </div>
          </div>
          <div style={{
            position: "relative",
            width: "300px",
            height: "300px",
            flexShrink: 0
          }}>
            {/* Decorative rings */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "200px",
              height: "200px",
              border: "2px solid #72d4f3",
              borderRadius: "50%",
              opacity: 0.3
            }}></div>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "150px",
              height: "150px",
              border: "2px solid #64dcdc",
              borderRadius: "50%",
              opacity: 0.5
            }}></div>
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100px",
              height: "100px",
              border: "2px solid #3c8c8c",
              borderRadius: "50%",
              opacity: 0.7
            }}></div>
          </div>
        </header>

        {/* AT A GLANCE */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem"
        }}>
          <InfoCard
            title="Goal"
            body="Detect periodic transit signals and classify whether a target is likely a planet."
            footer="Binary classification: planet vs non-planet"
          />
          <InfoCard
            title="Inputs"
            body="Space telescope light curves (Kepler / TESS), metadata (period candidates), and optional vetting features."
            footer="Raw flux vs time (BJD)"
          />
          <InfoCard
            title="Outputs"
            body="Predicted label (planet / not), probability score, salient features, and review plots."
            footer="Scores drive the ranked candidate list"
          />
          <InfoCard
            title="Models"
            body="BLS for period search; features → Gradient Boosting / Random Forest; optional CNN on folded light curves."
            footer="Configurable per mission"
          />
        </section>

        {/* IMAGES / GALLERY */}
        <section style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          padding: "2.5rem",
          marginBottom: "3rem",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #72d4f3, #64dcdc, #3c8c8c)",
            borderRadius: "20px 20px 0 0"
          }} />
          <h2 style={{
            color: "#64dcdc",
            fontSize: "2rem",
            marginBottom: "1rem",
            fontWeight: "600"
          }}>Signal Evolution </h2>
          <p style={{
            color: "#72d4f3",
            marginBottom: "2rem",
            opacity: 0.9
          }}>
            From raw to folded each stage the model sees. 
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem"
          }}>
            <ImageBox src="./assets/rawlight-curve.png" caption="Raw Light Curve" desc="Spacecraft systematics + stellar variability." />
            <ImageBox src="./assets/BLS.png" caption="Detrended & De-noised" desc="Co-trending, normalization, outlier clipping." />
            <ImageBox src="./assets/phase-foled.png" caption="Phase-Folded" desc="Fold at detected period & bin for clarity." />
            <ImageBox src="./assets/rawlight-curve.png" caption="BLS Periodogram" desc="Peak identifies candidate orbital period." />
          </div>
        </section>

        {/* PIPELINE */}
        <section id="pipeline" style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          padding: "2.5rem",
          marginBottom: "3rem",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #72d4f3, #64dcdc, #3c8c8c)",
            borderRadius: "20px 20px 0 0"
          }} />
          <h2 style={{
            color: "#64dcdc",
            fontSize: "2rem",
            marginBottom: "2rem",
            fontWeight: "600",
            textAlign: "center"
          }}>Pipeline Overview</h2>
          <ol style={{
            listStyle: "none",
            padding: 0,
            counterReset: "step",
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
          }}>
            {[
              { title: "Ingest & Normalize", desc: "Load mission LCs (Kepler/TESS). Remove NaNs, normalize flux, align timestamps (e.g., BJD). Optional sigma-clip outliers and fill small gaps." },
              { title: "Detrend & Systematics Removal", desc: "Remove long-term trends (Savitzky–Golay or spline), co-trend common modes (mission-specific), and preserve transit-scale features." },
              { title: "Period Search (BLS)", desc: "Run Box-Least-Squares over a period grid. Extract top peaks and compute depth, duration, epoch, and BLS power." },
              { title: "Fold & Feature Engineering", desc: "Phase-fold at candidate period, bin to fixed length. Compute features: depth, duration, odd/even depth ratio, SNR, secondary eclipse score, out-of-transit scatter, etc." },
              { title: "Classification", desc: "Tabular path: Gradient Boosting / Random Forest on engineered features. Vision path: 1D-CNN on folded curve image (or 2D render) for end-to-end scoring." },
              { title: "Vetting & Thresholding", desc: "Apply probability thresholds, astrophysical sanity checks, and mission-specific heuristics (e.g., odd-even, duration vs. period)." }
            ].map((step, index) => (
              <li key={index} style={{
                position: "relative",
                paddingLeft: "5rem",
                counterIncrement: "step",
                textAlign: "left",
              }}>
                <div style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  width: "3rem",
                  height: "3rem",
                  backgroundColor: "#72d4f3",
                  color: "#0c1525",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  boxShadow: "0 4px 12px rgba(114, 212, 243, 0.3)"
                }}>
                  {index + 1}
                </div>
                <h3 style={{
                  color: "#64dcdc",
                  fontSize: "1.4rem",
                  marginBottom: "0.5rem",
                  fontWeight: "600"
                }}>{step.title}</h3>
                <p style={{
                  color: "#ffffff",
                  lineHeight: "1.6",
                  margin: 0
                }}>{step.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* DETAILS / ACCORDION */}
        <section style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          padding: "2.5rem",
          marginBottom: "3rem",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #72d4f3, #64dcdc, #3c8c8c)",
            borderRadius: "20px 20px 0 0"
          }} />
          <h2 style={{
            color: "#64dcdc",
            fontSize: "2rem",
            marginBottom: "2rem",
            fontWeight: "600"
          }}>Key Details</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              {
                summary: "Feature Set (tabular model)",
                content: (
                  <ul style={{
                    color: "#ffffff",
                    margin: "1rem 0 0 0",
                    paddingLeft: "1.5rem",
                    lineHeight: "1.6"
                  }}>
                    <li>BLS power, transit depth, duration, SNR</li>
                    <li>Odd vs even transit depth ratio (EB check)</li>
                    <li>Secondary eclipse score (phase ~0.5)</li>
                    <li>Out-of-transit RMS, in-transit RMS, CDPP-like measures</li>
                    <li>Robustness: period jitter test, in-fold vs out-fold contrast</li>
                  </ul>
                )
              },
              {
                summary: "CNN Variant (folded curve)",
                content: (
                  <p style={{
                    color: "#ffffff",
                    margin: "1rem 0 0 0",
                    lineHeight: "1.6"
                  }}>
                    Convert the folded, binned light curve into a fixed-length vector (e.g., 256–512 bins). A shallow 1D-CNN
                    (Conv→ReLU→Pool) extracts local patterns; a small MLP head outputs probabilities.
                  </p>
                )
              },
              {
                summary: "Training & Evaluation",
                content: (
                  <ul style={{
                    color: "#ffffff",
                    margin: "1rem 0 0 0",
                    paddingLeft: "1.5rem",
                    lineHeight: "1.6"
                  }}>
                    <li>Stratified splits by star to prevent leak across folds</li>
                    <li>Metrics: Precision, Recall, ROC-AUC, PR-AUC; confusion matrix</li>
                    <li>Calibrate probabilities (Platt or isotonic) for threshold tuning</li>
                    <li>Cross-mission robustness: train/test on mixed Kepler/TESS subsets</li>
                  </ul>
                )
              }
            ].map((item, index) => (
              <details key={index} style={{
                backgroundColor: "rgba(12, 21, 37, 0.6)",
                borderRadius: "12px",
                border: "1px solid #447894",
                overflow: "hidden",
                transition: "all 0.3s ease"
              }}>
                <summary style={{
                  padding: "1.5rem",
                  color: "#64dcdc",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  listStyle: "none",
                  position: "relative"
                }}>
                  {item.summary}
                  <span style={{
                    position: "absolute",
                    right: "1.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#72d4f3"
                  }}>▼</span>
                </summary>
                <div style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}>
                  {item.content}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* METRICS */}
        <section style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          padding: "2.5rem",
          marginBottom: "3rem",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #72d4f3, #64dcdc, #3c8c8c)",
            borderRadius: "20px 20px 0 0"
          }} />
          <h2 style={{
            color: "#64dcdc",
            fontSize: "2rem",
            marginBottom: "2rem",
            fontWeight: "600"
          }}>Metrics & Diagnostics</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem"
          }}>
            <ImageBox src="./assets/confusionmatrix.png" caption="Confusion Matrix" />
            <ImageBox src="./assets/heatmap.png" caption="Heat Map" />
            <ImageBox src="./assets/tab.png" caption="NASA Table" />
          </div>
        </section>

        {/* DATA DICTIONARY */}
        <section style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          padding: "2.5rem",
          marginBottom: "3rem",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #72d4f3, #64dcdc, #3c8c8c)",
            borderRadius: "20px 20px 0 0"
          }} />
          <h2 style={{
            color: "#64dcdc",
            fontSize: "2rem",
            marginBottom: "2rem",
            fontWeight: "600"
          }}>Feature Glossary</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { k: "bls_power", v: "Peak power in the BLS periodogram at the selected period." },
              { k: "depth", v: "Relative transit depth (ppm or normalized flux units)." },
              { k: "duration", v: "Transit duration (hours) estimated from fit or BLS box width." },
              { k: "snr", v: "Transit signal-to-noise ratio." },
              { k: "odd_even_ratio", v: "Odd vs. even transit depth ratio (eclipsing binary check)." },
              { k: "oott_rms", v: "Out-of-transit RMS (stability/variability indicator)." },
              { k: "secondary_score", v: "Likelihood of a secondary eclipse near phase 0.5." }
            ].map((item, index) => (
              <DictItem key={index} k={item.k} v={item.v} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          padding: "3rem",
          marginBottom: "3rem",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          position: "relative"
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #72d4f3, #64dcdc, #3c8c8c)",
            borderRadius: "20px 20px 0 0"
          }} />
          <h2 style={{
            color: "#64dcdc",
            fontSize: "2.2rem",
            marginBottom: "1rem",
            fontWeight: "600"
          }}>Explore the Data</h2>
          <p style={{
            color: "#72d4f3",
            fontSize: "1.1rem",
            marginBottom: "2rem",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.6"
          }}>
            Load real Kepler/TESS catalogs on the Exo Catalog page, filter confirmations, and export subsets.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Link
              to="/machine-learning"
              style={{
                padding: "1rem 2rem",
                backgroundColor: "#72d4f3",
                color: "#0c1525",
                textDecoration: "none",
                borderRadius: "25px",
                fontWeight: "600",
                fontSize: "1.1rem",
                border: "2px solid #72d4f3",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#72d4f3";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#72d4f3";
                e.currentTarget.style.color = "#0c1525";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Go to Exo Catalog
            </Link>
          </div>
        </section>
      </div>
      <FooterComponent />
    </div>
  );
}

/* ---------- small components ---------- */
function InfoCard({ title, body, footer }) {
  return (
    <article style={{
      background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
      borderRadius: "15px",
      padding: "2rem",
      border: "1px solid #3c8c8c",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease",
      position: "relative"
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(114, 212, 243, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
      }}
    >
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #72d4f3, #64dcdc, #3c8c8c)",
        borderRadius: "15px 15px 0 0"
      }} />
      <h3 style={{
        color: "#64dcdc",
        fontSize: "1.3rem",
        marginBottom: "1rem",
        fontWeight: "600"
      }}>{title}</h3>
      <p style={{
        color: "#ffffff",
        lineHeight: "1.6",
        flex: 1,
        marginBottom: "1rem"
      }}>{body}</p>
      {footer && <div style={{
        color: "#72d4f3",
        fontSize: "0.9rem",
        opacity: 0.8,
        borderTop: "1px solid #447894",
        paddingTop: "1rem"
      }}>{footer}</div>}
    </article>
  );
}

function ImageBox({ src, caption, desc }) {
  return (
    <figure style={{
      margin: 0,
      textAlign: "center"
    }}>
      <img
        src={src}
        alt={caption || "diagram"}
        loading="lazy"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px",
          border: "2px solid #447894",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.05)"
        }}
      />
      <figcaption style={{
        marginTop: "0.75rem",
        color: "#ffffff"
      }}>
        <strong style={{ color: "#64dcdc" }}>{caption}</strong>
        {desc && <span style={{ color: "#72d4f3", opacity: 0.8 }}> — {desc}</span>}
      </figcaption>
    </figure>
  );
}

function DictItem({ k, v }) {
  return (
    <div style={{
      display: "flex",
      gap: "1rem",
      alignItems: "flex-start",
      padding: "1rem",
      backgroundColor: "rgba(12, 21, 37, 0.6)",
      borderRadius: "8px",
      border: "1px solid #447894"
    }}>
      <code style={{
        backgroundColor: "rgba(114, 212, 243, 0.1)",
        color: "#72d4f3",
        padding: "0.5rem 0.75rem",
        borderRadius: "6px",
        fontSize: "0.9rem",
        fontWeight: "600",
        border: "1px solid rgba(114, 212, 243, 0.3)",
        flexShrink: 0,
        minWidth: "140px"
      }}>{k}</code>
      <div style={{
        color: "#ffffff",
        lineHeight: "1.5",
        flex: 1
      }}>{v}</div>
    </div>
  );
}