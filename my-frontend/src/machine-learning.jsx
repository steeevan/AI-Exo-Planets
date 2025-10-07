// src/pages/ExoCatalog.jsx
import React, { useMemo, useState } from "react";
import "./exo.css";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

const HEADER_H = 96;

/* ================= CSV PARSER (robust) ================= */
function parseCSV(text) {
  // Normalize line endings, keep quoted commas/newlines safe
  let i = 0, f = "", row = [], rows = [], inQuotes = false;
  const pushField = () => { row.push(f); f = ""; };
  const pushRow = () => { rows.push(row); row = []; };

  while (i < text.length) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { f += '"'; i += 2; }  // escaped quote
        else { inQuotes = false; i++; }
      } else { f += c; i++; }
    } else {
      if (c === '"') { inQuotes = true; i++; }
      else if (c === ",") { pushField(); i++; }
      else if (c === "\r") { i++; /* ignore CR */ }
      else if (c === "\n") { pushField(); pushRow(); i++; }
      else { f += c; i++; }
    }
  }
  if (f.length > 0 || row.length > 0) { pushField(); pushRow(); }

  // drop empty lines
  return rows.filter(r => r.some(x => String(x).trim() !== ""));
}

const toNumber = (v) => {
  const s = String(v ?? "").trim();
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};

const DISPO_TRUE = new Set(["CONFIRMED", "CP", "PLANET", "CONFIRMED PLANET", "KP"]);
const DISPO_FALSE = new Set(["FALSE POSITIVE", "FP", "RETRACTED"]);

/* ================= Schema Detect ================= */
function detectSchema(headers) {
  const set = new Set(headers.map(h => h.toLowerCase()));
  // Our unified CSV (from exo_csv.mjs)
  if (set.has("mission") && set.has("period_days") && set.has("radius_re")) return "unified";
  // Kepler raw
  if (set.has("koi_disposition") || set.has("koi_prad") || set.has("koi_period")) return "kepler";
  // TESS raw
  if (set.has("disposition") || set.has("tfopwg disposition") || set.has("tfopwg_disposition") || set.has("toi")) return "tess";
  return "unknown";
}

/* ================= Row Mapper ================= */
function mapRow(schema, headers, row) {
  const idx = (key) => headers.findIndex(h => h.toLowerCase() === key.toLowerCase());
  const get = (key) => {
    const i = idx(key);
    return i >= 0 ? row[i] : undefined;
  };

  if (schema === "unified") {
    return {
      mission: String(get("mission") ?? ""),
      id: String(get("id") ?? ""),
      name: String(get("name") ?? ""),
      host: "", // not provided in unified CSV
      disposition: String(get("disposition") ?? "").toUpperCase().trim(),
      period: toNumber(get("period_days")),
      radius: toNumber(get("radius_re")),
      snr: toNumber(get("snr")),
    };
  }

  if (schema === "kepler") {
    const id = get("kepid") ?? get("kepler_id") ?? get("kepoi_name") ?? get("kepler_name") ?? get("koi_name");
    const name = get("kepler_name") ?? get("kepoi_name") ?? id ?? "";
    const host = (get("kepler_name") ?? "").split(" ")[0] ?? "";
    const period = toNumber(get("koi_period"));
    const radius = toNumber(get("koi_prad"));
    const snr = toNumber(get("koi_model_snr") ?? get("koi_snr"));
    const disposition = String(get("koi_disposition") ?? get("koi_pdisposition") ?? "").toUpperCase().trim();
    return { mission: "Kepler", id: String(id ?? name ?? ""), name: String(name ?? ""), host, disposition, period, radius, snr };
  }

  if (schema === "tess") {
    const id = get("TIC ID") ?? get("TIC") ?? get("tic_id") ?? get("tic");
    const name = get("TOI") ?? get("toi") ?? get("TOI Name") ?? get("Full TOI ID");
    const host = get("Star Name") ?? get("host") ?? get("hostname") ?? "";
    const period = toNumber(get("Period") ?? get("period") ?? get("pl_orbper") ?? get("orbital_period"));
    const radius = toNumber(get("Planet Radius (R_Earth)") ?? get("pl_rade") ?? get("planet_radius") ?? get("radius"));
    const snr = toNumber(get("SNR") ?? get("snr") ?? get("ts_snr"));
    const disposition = String(
      get("Disposition") ?? get("TFOPwg Disposition") ?? get("tfopwg_disposition") ?? get("disposition") ?? ""
    ).toUpperCase().trim();
    return { mission: "TESS", id: String(name ?? id ?? ""), name: String(name ?? id ?? ""), host, disposition, period, radius, snr };
  }

  // Fallback: try common keys including unified ones
  return {
    mission: get("mission") ?? "",
    id: String(get("id") ?? get("name") ?? get("kepid") ?? get("tic") ?? ""),
    name: String(get("name") ?? get("kepler_name") ?? get("toi") ?? get("tic") ?? ""),
    host: String(get("host") ?? get("hostname") ?? get("Star Name") ?? ""),
    disposition: String(get("disposition") ?? get("koi_disposition") ?? get("TFOPwg Disposition") ?? "").toUpperCase().trim(),
    period: toNumber(get("period_days") ?? get("koi_period") ?? get("period") ?? get("pl_orbper")),
    radius: toNumber(get("radius_re") ?? get("koi_prad") ?? get("pl_rade") ?? get("Planet Radius (R_Earth)")),
    snr: toNumber(get("snr") ?? get("koi_model_snr") ?? get("SNR")),
  };
}

function isConfirmed(d) {
  const s = String(d ?? "").toUpperCase().trim();
  if (DISPO_TRUE.has(s)) return true;
  if (DISPO_FALSE.has(s)) return false;
  if (s.includes("CONFIRMED")) return true;
  if (s === "CANDIDATE" || s === "PC") return false;
  return false;
}

/* ================= Page ================= */
export default function ExoCatalog() {
  const [schema, setSchema] = useState("unknown");
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);

  const [query, setQuery] = useState("");
  const [confirmedOnly, setConfirmedOnly] = useState(false);
  const [rMin, setRMin] = useState("");
  const [rMax, setRMax] = useState("");
  const [pMin, setPMin] = useState("");
  const [pMax, setPMax] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const [sample, setSample] = useState("");

  const loadFromText = (text) => {
    const arr = parseCSV(text);
    if (!arr.length) { setHeaders([]); setRows([]); setSchema("unknown"); return; }

    // Strip UTF-8 BOM from first header cell
    arr[0][0] = String(arr[0][0] ?? "").replace(/^\uFEFF/, "");
    const hdr = arr[0].map(h => String(h).trim());

    const sch = detectSchema(hdr);
    const mapped = arr.slice(1).map(r => mapRow(sch, hdr, r));

    setSchema(sch);
    setHeaders(hdr);
    setRows(mapped);
  };

  const handleFile = async (file) => {
    const text = await file.text();
    loadFromText(text);
  };

  async function loadSampleSelection() {
    if (!sample) return;
    if (sample.startsWith("demo:")) {
      const DEMO_KEPLER_CSV = `mission,id,name,disposition,period_days,radius_re,snr
Kepler,1234567,Kepler-10 b,CONFIRMED,0.837,1.42,25
Kepler,7654321,Kepler-XYZ c,CANDIDATE,12.5,2.3,12`;
      const DEMO_TESS_CSV = `mission,id,name,disposition,period_days,radius_re,snr
TESS,123456789,TOI-700 d,CONFIRMED,37.4,1.14,`;
      loadFromText(sample === "demo:kepler" ? DEMO_KEPLER_CSV : DEMO_TESS_CSV);
      return;
    }
    if (sample.startsWith("public:")) {
      const BASE = (import.meta.env && import.meta.env.BASE_URL) || "/";
      const path =
        sample === "public:kepler" ? `${BASE}data/kepler_koi.csv` :
          sample === "public:tess" ? `${BASE}data/tess_toi.csv` :
            null;
      if (!path) return;
      const resp = await fetch(path, { cache: "no-cache" });
      if (!resp.ok) { alert(`Failed to fetch ${path}: ${resp.status}`); return; }
      const text = await resp.text();
      loadFromText(text);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rlo = rMin === "" ? -Infinity : Number(rMin);
    const rhi = rMax === "" ? Infinity : Number(rMax);
    const plo = pMin === "" ? -Infinity : Number(pMin);
    const phi = pMax === "" ? Infinity : Number(pMax);

    return rows
      .filter(r => {
        if (confirmedOnly && !isConfirmed(r.disposition)) return false;
        if (q) {
          const hay = `${r.name} ${r.id} ${r.host} ${r.mission} ${r.disposition}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        if (r.radius != null && !(r.radius >= rlo && r.radius <= rhi)) return false;
        if (r.radius == null && (rMin !== "" || rMax !== "")) return false;
        if (r.period != null && !(r.period >= plo && r.period <= phi)) return false;
        if (r.period == null && (pMin !== "" || pMax !== "")) return false;
        return true;
      })
      .sort((a, b) => {
        const dir = sortDir === "asc" ? 1 : -1;
        const av = a[sortKey], bv = b[sortKey];
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
        return String(av).localeCompare(String(bv)) * dir;
      });
  }, [rows, query, confirmedOnly, rMin, rMax, pMin, pMax, sortKey, sortDir]);

  const setSort = (key) =>
    setSortKey(k => (k === key ? (setSortDir(d => (d === "asc" ? "desc" : "asc")), k) : (setSortDir("asc"), key)));

  return (
    <div style={{ backgroundColor: "#0c1525", minHeight: "100vh" }}>
      <HeaderComponent />
      <div style={{ padding: "2rem", paddingTop: `${HEADER_H + 80}px`, maxWidth: "1400px", margin: "0 auto" }}>

        {/* Hero Section */}
        <div style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "3rem 2rem",
          background: "linear-gradient(135deg, #0c1525 0%, #447894 100%)",
          borderRadius: "25px",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
        }}>
          <h1 style={{
            color: "#64dcdc",
            fontSize: "3rem",
            fontWeight: "700",
            margin: "0 0 1rem 0",
            textShadow: "0 2px 10px rgba(114, 212, 243, 0.3)",
            letterSpacing: "0.5px"
          }}>
            Exoplanet Catalog
          </h1>
          <p style={{
            color: "#72d4f3",
            fontSize: "1.3rem",
            margin: "0 auto",
            maxWidth: "600px",
            lineHeight: "1.6",
            opacity: 0.9
          }}>
            Explore Kepler and TESS exoplanet data. Upload CSVs or load sample datasets with unified schema support.
          </p>
        </div>

        {/* Upload Section */}
        <div style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          padding: "2.5rem",
          marginBottom: "2rem",
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

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "end"
          }}>
            {/* File Upload */}
            <div>
              <label style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2rem",
                backgroundColor: "transparent",
                color: "#72d4f3",
                border: "2px solid #72d4f3",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "1.1rem",
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
                Choose CSV File
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
              <p style={{ color: "#72d4f3", fontSize: "0.9rem", opacity: 0.8, margin: 0 }}>
                Upload Kepler or TESS CSV data
              </p>
            </div>

            {/* Sample Data */}
            <div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <select
                  value={sample}
                  onChange={(e) => setSample(e.target.value)}
                  style={{
                    flex: "1",
                    minWidth: "200px",
                    padding: "1rem",
                    backgroundColor: "rgba(12, 21, 37, 0.8)",
                    color: "#72d4f3",
                    border: "1px solid #3c8c8c",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <option value="">— Select sample dataset —</option>
                  <option value="public:kepler">Kepler KOI (generated CSV)</option>
                  <option value="public:tess">TESS TOI (generated CSV)</option>
                  <option value="demo:kepler">Demo Kepler (tiny)</option>
                  <option value="demo:tess">Demo TESS (tiny)</option>
                </select>
                <button
                  onClick={loadSampleSelection}
                  disabled={!sample}
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: !sample ? "rgba(60, 140, 140, 0.3)" : "#3c8c8c",
                    color: !sample ? "rgba(255, 255, 255, 0.5)" : "#0c1525",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: !sample ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    if (sample) {
                      e.currentTarget.style.backgroundColor = "#64dcdc";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sample) {
                      e.currentTarget.style.backgroundColor = "#3c8c8c";
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                >
                  Load Sample
                </button>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div style={{
            display: "flex",
            gap: "2rem",
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid #3c8c8c",
            flexWrap: "wrap"
          }}>
            <div style={{ color: "#64dcdc", fontWeight: "600" }}>
              <span style={{ opacity: 0.8 }}>Schema: </span>
              <span style={{
                backgroundColor: "rgba(100, 220, 220, 0.1)",
                padding: "0.25rem 0.75rem",
                borderRadius: "15px",
                border: "1px solid #64dcdc"
              }}>
                {schema}
              </span>
            </div>
            <div style={{ color: "#72d4f3" }}>
              <span style={{ opacity: 0.8 }}>Columns: </span>
              <strong>{headers.length || "—"}</strong>
            </div>
            <div style={{ color: "#72d4f3" }}>
              <span style={{ opacity: 0.8 }}>Rows: </span>
              <strong>{rows.length}</strong>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          padding: "2rem",
          marginBottom: "2rem",
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

          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
              <input
                placeholder="Search name/ID/host/disposition…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  flex: "1",
                  minWidth: "250px",
                  padding: "1rem",
                  backgroundColor: "rgba(12, 21, 37, 0.8)",
                  color: "#ffffff",
                  border: "1px solid #447894",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  backdropFilter: "blur(10px)"
                }}
              />
              <label style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#72d4f3",
                cursor: "pointer",
                fontWeight: "500"
              }}>
                <input
                  type="checkbox"
                  checked={confirmedOnly}
                  onChange={(e) => setConfirmedOnly(e.target.checked)}
                  style={{
                    width: "18px",
                    height: "18px",
                    accentColor: "#72d4f3"
                  }}
                />
                Confirmed only
              </label>
            </div>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem"
          }}>
            <div>
              <div style={{ color: "#64dcdc", fontWeight: "600", marginBottom: "0.5rem" }}>
                Radius (R⊕)
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  placeholder="min"
                  value={rMin}
                  onChange={(e) => setRMin(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    backgroundColor: "rgba(12, 21, 37, 0.8)",
                    color: "#ffffff",
                    border: "1px solid #447894",
                    borderRadius: "8px",
                    fontSize: "0.9rem"
                  }}
                />
                <span style={{ color: "#72d4f3", opacity: 0.7 }}>—</span>
                <input
                  placeholder="max"
                  value={rMax}
                  onChange={(e) => setRMax(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    backgroundColor: "rgba(12, 21, 37, 0.8)",
                    color: "#ffffff",
                    border: "1px solid #447894",
                    borderRadius: "8px",
                    fontSize: "0.9rem"
                  }}
                />
              </div>
            </div>

            <div>
              <div style={{ color: "#64dcdc", fontWeight: "600", marginBottom: "0.5rem" }}>
                Period (days)
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  placeholder="min"
                  value={pMin}
                  onChange={(e) => setPMin(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    backgroundColor: "rgba(12, 21, 37, 0.8)",
                    color: "#ffffff",
                    border: "1px solid #447894",
                    borderRadius: "8px",
                    fontSize: "0.9rem"
                  }}
                />
                <span style={{ color: "#72d4f3", opacity: 0.7 }}>—</span>
                <input
                  placeholder="max"
                  value={pMax}
                  onChange={(e) => setPMax(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    backgroundColor: "rgba(12, 21, 37, 0.8)",
                    color: "#ffffff",
                    border: "1px solid #447894",
                    borderRadius: "8px",
                    fontSize: "0.9rem"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div style={{
          background: "linear-gradient(145deg, #1a2a3a 0%, #0c1525 100%)",
          borderRadius: "20px",
          border: "1px solid #3c8c8c",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          position: "relative",
          overflow: "hidden"
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

          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              color: "#ffffff"
            }}>
              <thead>
                <tr style={{
                  backgroundColor: "rgba(12, 21, 37, 0.9)",
                  backdropFilter: "blur(10px)"
                }}>
                  <Th label="Mission" k="mission" sortKey={sortKey} sortDir={sortDir} setSort={setSort} />
                  <Th label="Name" k="name" sortKey={sortKey} sortDir={sortDir} setSort={setSort} />
                  <Th label="Host" k="host" sortKey={sortKey} sortDir={sortDir} setSort={setSort} />
                  <Th label="Disposition" k="disposition" sortKey={sortKey} sortDir={sortDir} setSort={setSort} />
                  <Th label="Period (d)" k="period" right sortKey={sortKey} sortDir={sortDir} setSort={setSort} />
                  <Th label="Radius (R⊕)" k="radius" right sortKey={sortKey} sortDir={sortDir} setSort={setSort} />
                  <Th label="SNR" k="snr" right sortKey={sortKey} sortDir={sortDir} setSort={setSort} />
                </tr>
              </thead>
              <tbody>
                {filtered.length ? filtered.map((r, i) => (
                  <tr
                    key={`${r.mission}-${r.id}-${i}`}
                    style={{
                      borderBottom: "1px solid #2a3a4a",
                      transition: "background-color 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(114, 212, 243, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td style={{ padding: "1rem", color: "#72d4f3", fontWeight: "500" }}>
                      {r.mission || "—"}
                    </td>
                    <td style={{ padding: "1rem", color: "#ffffff" }}>
                      {r.name || "—"}
                    </td>
                    <td style={{ padding: "1rem", color: "#ffffff" }}>
                      {r.host || "—"}
                    </td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "15px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        backgroundColor: isConfirmed(r.disposition)
                          ? "rgba(100, 220, 220, 0.2)"
                          : "rgba(114, 212, 243, 0.1)",
                        color: isConfirmed(r.disposition) ? "#64dcdc" : "#72d4f3",
                        border: `1px solid ${isConfirmed(r.disposition) ? "#64dcdc" : "#72d4f3"}`,
                        textTransform: "uppercase"
                      }}>
                        {r.disposition || "—"}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", textAlign: "right", color: "#ffffff" }}>
                      {r.period ?? "—"}
                    </td>
                    <td style={{ padding: "1rem", textAlign: "right", color: "#ffffff" }}>
                      {r.radius ?? "—"}
                    </td>
                    <td style={{ padding: "1rem", textAlign: "right", color: "#ffffff" }}>
                      {r.snr ?? "—"}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td
                      style={{
                        padding: "3rem",
                        textAlign: "center",
                        color: "#72d4f3",
                        fontSize: "1.1rem",
                        fontStyle: "italic"
                      }}
                      colSpan={7}
                    >
                      No exoplanets match your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        {filtered.length > 0 && (
          <div style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#72d4f3",
            fontSize: "0.9rem",
            opacity: 0.8
          }}>
            Showing {filtered.length} of {rows.length} exoplanets
          </div>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}

function Th({ label, k, sortKey, sortDir, setSort, right }) {
  const active = sortKey === k;
  return (
    <th
      style={{
        padding: "1rem",
        textAlign: right ? "right" : "left",
        fontWeight: "600",
        color: "#64dcdc",
        cursor: "pointer",
        userSelect: "none",
        borderBottom: "2px solid #3c8c8c",
        transition: "all 0.2s ease",
        position: "relative"
      }}
      onClick={() => setSort(k)}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(114, 212, 243, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        justifyContent: right ? "flex-end" : "flex-start"
      }}>
        <span>{label}</span>
        <span style={{
          color: active ? "#72d4f3" : "rgba(114, 212, 243, 0.5)",
          fontSize: "0.8rem",
          transition: "all 0.2s ease"
        }}>
          {active ? (sortDir === "asc" ? "▲" : "▼") : "⋯"}
        </span>
      </div>
    </th>
  );
}