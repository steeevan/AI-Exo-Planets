import React from "react";
import { Link } from "react-router-dom";
import "./ml.css";
import raw from "./assets/rawlight-curve.png"
import blk from "./assets/BLS.png"
import confusion from "./assets/confusionmatrix.png"
import detre from "./assets/detrended.png"
import heat from "./assets/heatmap.png"
import phase from "./assets/phase-foled.png"
import tab from "./assets/tab.png"
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

export default function MLDetails() {
  return (
    <div>

    
    <HeaderComponent />
    <div className="ml-page">
        
      {/* HERO */}
      <header className="ml-hero card">
        <div className="ml-hero-text">
          <h1>How Our Exoplanet ML Works</h1>
          <p className="sub">
            A transparent view of our end-to-end pipeline—how we transform raw Kepler/TESS light curves into
            candidate classifications and confident confirmations.
          </p>
          <div className="hero-actions">
            <Link to="/machine-learning" className="btn">Open Exo Catalog</Link>
            <a href="#pipeline" className="btn btn-ghost">Jump to Pipeline</a>
          </div>
        </div>
        <div className="ml-hero-art" aria-hidden="true">
          {/* Optional decorative rings */}
          <div className="ring r1"></div>
          <div className="ring r2"></div>
          <div className="ring r3"></div>
        </div>
      </header>

      {/* AT A GLANCE */}
      <section className="grid-4">
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
      <section className="card">
        <h2>Signal Evolution (Example)</h2>
        <p className="muted">
          From raw to folded—each stage the model sees. Replace the image paths with your exported figures.
        </p>
        <div className="img-grid">
          <ImageBox src={raw} caption="Raw Light Curve" desc="Spacecraft systematics + stellar variability." />
          <ImageBox src={detre} caption="Detrended & De-noised" desc="Co-trending, normalization, outlier clipping." />
          <ImageBox src={phase} caption="Phase-Folded" desc="Fold at detected period & bin for clarity." />
          <ImageBox src={blk} caption="BLS Periodogram" desc="Peak identifies candidate orbital period." />
        </div>
      </section>

      {/* PIPELINE */}
      <section id="pipeline" className="card">
        <h2>Pipeline Overview</h2>
        <ol className="steps">
          <li>
            <h3>Ingest & Normalize</h3>
            <p>
              Load mission LCs (Kepler/TESS). Remove NaNs, normalize flux, align timestamps (e.g., BJD). Optional sigma-clip
              outliers and fill small gaps.
            </p>
          </li>
          <li>
            <h3>Detrend & Systematics Removal</h3>
            <p>
              Remove long-term trends (Savitzky–Golay or spline), co-trend common modes (mission-specific), and preserve
              transit-scale features.
            </p>
          </li>
          <li>
            <h3>Period Search (BLS)</h3>
            <p>
              Run Box-Least-Squares over a period grid. Extract top peaks and compute depth, duration, epoch, and BLS power.
            </p>
          </li>
          <li>
            <h3>Fold & Feature Engineering</h3>
            <p>
              Phase-fold at candidate period, bin to fixed length. Compute features: depth, duration, odd/even depth ratio,
              SNR, secondary eclipse score, out-of-transit scatter, etc.
            </p>
          </li>
          <li>
            <h3>Classification</h3>
            <p>
              Tabular path: Gradient Boosting / Random Forest on engineered features. Vision path: 1D-CNN on folded curve image
              (or 2D render) for end-to-end scoring.
            </p>
          </li>
          <li>
            <h3>Vetting & Thresholding</h3>
            <p>
              Apply probability thresholds, astrophysical sanity checks, and mission-specific heuristics (e.g., odd-even, duration vs. period).
            </p>
          </li>
        </ol>
      </section>

      {/* DETAILS / ACCORDION */}
      <section className="card">
        <h2>Key Details</h2>
        <div className="details">
          <details>
            <summary>Feature Set (tabular model)</summary>
            <ul className="bullets">
              <li>BLS power, transit depth, duration, SNR</li>
              <li>Odd vs even transit depth ratio (EB check)</li>
              <li>Secondary eclipse score (phase ~0.5)</li>
              <li>Out-of-transit RMS, in-transit RMS, CDPP-like measures</li>
              <li>Robustness: period jitter test, in-fold vs out-fold contrast</li>
            </ul>
          </details>
          <details>
            <summary>CNN Variant (folded curve)</summary>
            <p>
              Convert the folded, binned light curve into a fixed-length vector (e.g., 256–512 bins). A shallow 1D-CNN
              (Conv→ReLU→Pool) extracts local patterns; a small MLP head outputs probabilities.
            </p>
          </details>
          <details>
            <summary>Training & Evaluation</summary>
            <ul className="bullets">
              <li>Stratified splits by star to prevent leak across folds</li>
              <li>Metrics: Precision, Recall, ROC-AUC, PR-AUC; confusion matrix</li>
              <li>Calibrate probabilities (Platt or isotonic) for threshold tuning</li>
              <li>Cross-mission robustness: train/test on mixed Kepler/TESS subsets</li>
            </ul>
          </details>
        </div>
      </section>

      {/* METRICS */}
      <section className="card">
        <h2>Metrics & Diagnostics</h2>
        <div className="metrics">
          <ImageBox src={confusion} caption="Confusion Matrix" />
          <ImageBox src={heat} caption="Heat Map" />
          <ImageBox src={tab} caption="NASA Table" />
        </div>
        
      </section>

      {/* DATA DICTIONARY */}
      <section className="card">
        <h2>Feature Glossary</h2>
        <div className="dict">
          <DictItem k="bls_power" v="Peak power in the BLS periodogram at the selected period." />
          <DictItem k="depth" v="Relative transit depth (ppm or normalized flux units)." />
          <DictItem k="duration" v="Transit duration (hours) estimated from fit or BLS box width." />
          <DictItem k="snr" v="Transit signal-to-noise ratio." />
          <DictItem k="odd_even_ratio" v="Odd vs. even transit depth ratio (eclipsing binary check)." />
          <DictItem k="oott_rms" v="Out-of-transit RMS (stability/variability indicator)." />
          <DictItem k="secondary_score" v="Likelihood of a secondary eclipse near phase 0.5." />
        </div>
      </section>

      {/* CTA */}
      <section className="cta card">
        <h2>Explore the Data</h2>
        <p>Load real Kepler/TESS catalogs on the Exo Catalog page, filter confirmations, and export subsets.</p>
        <div className="hero-actions">
          <Link to="/machine-learning" className="btn">Go to Exo Catalog</Link>
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
    <article className="info card">
      <h3>{title}</h3>
      <p>{body}</p>
      {footer && <div className="muted small">{footer}</div>}
    </article>
  );
}

function ImageBox({ src, caption, desc }) {
  return (
    <figure className="img-box">
      <img src={src} alt={caption || "diagram"} loading="lazy" />
      <figcaption>
        <strong>{caption}</strong>
        {desc && <span className="muted"> — {desc}</span>}
      </figcaption>
    </figure>
  );
}

function DictItem({ k, v }) {
  return (
    <div className="dict-item">
      <code className="dict-key">{k}</code>
      <div className="dict-val">{v}</div>
    </div>
  );
}
