// scripts/exo_csv.mjs
// Fetch Kepler KOI (cumulative) + TESS TOI from NASA Exoplanet Archive TAP,
// convert to unified CSV, and write to public/data/ for your app's dataset picker.
//
// Output files:
//   public/data/kepler_koi.csv
//   public/data/tess_toi.csv
//
// Usage:
//   node scripts/exo_csv.mjs
//
// Notes:
// - Uses '+' for spaces in the ADQL query (TAP-friendly).
// - Handles either TAP JSON shape: array-of-objects OR { metadata, data }.
// - Kepler SNR column is koi_model_snr (not koi_snr).
// - Unified CSV header: mission,id,name,disposition,period_days,radius_re,snr

import fs from "node:fs/promises";
import path from "node:path";
import https from "node:https";

const OUT_DIR = path.resolve(process.cwd(), "public", "data");
await fs.mkdir(OUT_DIR, { recursive: true });

/** ---------- ADQL QUERIES ---------- */
const ADQL = {
  kepler: `
    SELECT
      kepid           AS id,
      kepler_name     AS name,
      koi_disposition AS disposition,
      koi_period      AS period_days,
      koi_prad        AS radius_re,
      koi_model_snr   AS snr
    FROM cumulative
  `,
  tess: `
    SELECT
      tid             AS id,
      toi             AS name,
      tfopwg_disp     AS disposition,
      pl_orbper       AS period_days,
      pl_rade         AS radius_re
    FROM toi
  `,
};

/** ---------- HELPERS ---------- */
function buildTapJsonUrl(adql) {
  // Collapse whitespace, then replace spaces with '+' (per TAP examples).
  const normalized = adql.trim().replace(/\s+/g, " ");
  const withPluses = normalized.replace(/ /g, "+");
  const base = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";
  // format=json -> returns either array-of-objects or {metadata,data}
  // maxrec large enough to cover table sizes comfortably
  return `${base}?query=${withPluses}&format=json&maxrec=200000`;
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      { headers: { "User-Agent": "ExoCatalog/1.0", Accept: "application/json" } },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode !== 200) {
            // Print a small snippet to help debug (often an XML/VOTABLE error string)
            return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
          }
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error("Invalid JSON (server likely returned HTML/XML)."));
          }
        });
      }
    ).on("error", reject);
  });
}

// Convert TAP JSON -> array of row objects with our aliased keys already applied
function rowsFromTapJson(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data) && Array.isArray(payload.metadata)) {
    const cols = payload.metadata.map((m) => m.name);
    return payload.data.map((arr) =>
      Object.fromEntries(arr.map((v, i) => [cols[i], v]))
    );
  }
  throw new Error("Unexpected TAP JSON shape");
}

function toCSV(rows, mission) {
  const headers = ["mission", "id", "name", "disposition", "period_days", "radius_re", "snr"];
  const escape = (v) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(
      [
        mission,
        r.id ?? "",
        r.name ?? "",
        r.disposition ?? "",
        r.period_days ?? "",
        r.radius_re ?? "",
        r.snr ?? "", // TESS lacks SNR; will be blank
      ].map(escape).join(",")
    );
  }
  return lines.join("\n");
}

/** ---------- MAIN ---------- */
async function run() {
  const tasks = [
    { mission: "Kepler", name: "kepler_koi.csv", url: buildTapJsonUrl(ADQL.kepler) },
    { mission: "TESS",   name: "tess_toi.csv",   url: buildTapJsonUrl(ADQL.tess)   },
  ];

  for (const t of tasks) {
    console.log(`Fetching ${t.mission} …`);
    const payload = await fetchJSON(t.url);
    const rows = rowsFromTapJson(payload);

    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error(`${t.mission}: zero rows`);
    }

    // Basic sanity: ensure aliased keys exist in at least one row
    const sample = rows[0] || {};
    const required = ["id", "name", "disposition", "period_days", "radius_re"];
    for (const key of required) {
      if (!(key in sample)) {
        throw new Error(`${t.mission}: expected column "${key}" missing in TAP response`);
      }
    }

    const csv = toCSV(rows, t.mission);
    if (!csv.startsWith("mission,id,name,disposition,period_days,radius_re,snr")) {
      throw new Error(`${t.mission}: CSV header mismatch`);
    }

    const outPath = path.join(OUT_DIR, t.name);
    await fs.writeFile(outPath, csv, "utf8");
    console.log(`Saved ${outPath} (${rows.length} rows)`);
  }

  console.log("Done.");
}

run().catch((e) => {
  console.error("Failed:", e.message);
  process.exit(1);
});