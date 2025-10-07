// src/pages/ExoCatalog.jsx
import React, { useMemo, useState } from "react";
import "./exo.css";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

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

const DISPO_TRUE = new Set(["CONFIRMED","CP","PLANET","CONFIRMED PLANET","KP"]);
const DISPO_FALSE = new Set(["FALSE POSITIVE","FP","RETRACTED"]);

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
        sample === "public:tess"   ? `${BASE}data/tess_toi.csv`   :
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
    <div>

    
    <HeaderComponent />
    <div className="exo-page">
      <h1 className="exo-title">Exoplanet Catalog (Kepler + TESS)</h1>
      <p className="exo-sub">Upload CSVs or load samples. Unified schema supported.</p>

      <div className="exo-card exo-upload">
        <label className="exo-file">
          <input type="file" accept=".csv,text/csv"
                 onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}/>
          <span>Choose CSV…</span>
        </label>

        <div className="exo-sample">
          <select
            className="exo-input"
            value={sample}
            onChange={(e) => setSample(e.target.value)}
            aria-label="Select a sample dataset"
          >
            <option value="">— Select a sample dataset —</option>
            <option value="public:kepler">Kepler KOI (Live Data)</option>
            <option value="public:tess">TESS TOI (Live Data)</option>
            <option value="demo:kepler">Demo (unified tiny)</option>
            <option value="demo:tess">Demo (unified tiny)</option>
          </select>
          <button className="exo-btn" onClick={loadSampleSelection} disabled={!sample}>
            Load sample
          </button>
        </div>

        <div className="exo-meta">
          <div><b>Schema:</b> {schema}</div>
          <div><b>Columns:</b> {headers.length || "—"}</div>
          <div><b>Rows:</b> {rows.length}</div>
        </div>
      </div>

      <div className="exo-card exo-controls">
        <div className="exo-row">
          <input className="exo-input" placeholder="Search name/ID/host/disposition…"
                 value={query} onChange={(e) => setQuery(e.target.value)} />
          <label className="exo-check">
            <input type="checkbox" checked={confirmedOnly} onChange={(e)=>setConfirmedOnly(e.target.checked)} />
            Confirmed only
          </label>
        </div>

        <div className="exo-row exo-grid">
          <div className="exo-range">
            <div className="exo-range-title">Radius (R⊕)</div>
            <div className="exo-range-fields">
              <input className="exo-input" placeholder="min" value={rMin} onChange={(e)=>setRMin(e.target.value)} />
              <span>—</span>
              <input className="exo-input" placeholder="max" value={rMax} onChange={(e)=>setRMax(e.target.value)} />
            </div>
          </div>

          <div className="exo-range">
            <div className="exo-range-title">Period (days)</div>
            <div className="exo-range-fields">
              <input className="exo-input" placeholder="min" value={pMin} onChange={(e)=>setPMin(e.target.value)} />
              <span>—</span>
              <input className="exo-input" placeholder="max" value={pMax} onChange={(e)=>setPMax(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="exo-card exo-table-wrap">
        <div className="exo-table-scroll">
          <table className="exo-table">
            <thead>
              <tr>
                <Th label="Mission" k="mission" sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
                <Th label="Name" k="name" sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
                <Th label="Host" k="host" sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
                <Th label="Disposition" k="disposition" sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
                <Th label="Period (d)" k="period" right sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
                <Th label="Radius (R⊕)" k="radius" right sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
                <Th label="SNR" k="snr" right sortKey={sortKey} sortDir={sortDir} setSort={setSort}/>
              </tr>
            </thead>
            <tbody>
              {filtered.length ? filtered.map((r, i) => (
                <tr key={`${r.mission}-${r.id}-${i}`}>
                  <td>{r.mission || "—"}</td>
                  <td>{r.name || "—"}</td>
                  <td>{r.host || "—"}</td>
                  <td>
                    <span className={`exo-badge ${isConfirmed(r.disposition) ? "ok" : "nope"}`}>
                      {r.disposition || "—"}
                    </span>
                  </td>
                  <td className="right">{r.period ?? "—"}</td>
                  <td className="right">{r.radius ?? "—"}</td>
                  <td className="right">{r.snr ?? "—"}</td>
                </tr>
              )) : (
                <tr><td className="empty" colSpan={7}>No rows match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optional quick debug */}
      {/* <details style={{marginTop:8}}>
        <summary>Debug</summary>
        <pre style={{whiteSpace:"pre-wrap", fontSize:12}}>
schema: {schema}
headers: {JSON.stringify(headers)}
rows: {rows.length}
        </pre>
      </details> */}
    </div>
    <FooterComponent />
    </div>
  );
}

function Th({ label, k, sortKey, sortDir, setSort, right }) {
  const active = sortKey === k;
  return (
    <th
      className={`exo-th ${right ? "right" : ""} ${active ? "active" : ""}`}
      onClick={() => setSort(k)}
      title="Click to sort"
    >
      <span>{label}</span>
      <span className="exo-sort">{active ? (sortDir === "asc" ? "▲" : "▼") : "⋯"}</span>
    </th>
  );
}
