# 🌌 Exoplanet Detection and Visualization Using AI

##  Project Overview

The main problem we wanted to solve was how to use **Artificial Intelligence (AI)** and **Machine Learning (ML)** to help identify new **exoplanets** using real data from NASA’s missions.

NASA’s **Kepler**, **K2**, and **TESS** telescopes have observed thousands of stars, each potentially hosting one or more planets. However, analyzing all of this data manually takes an enormous amount of time. It’s also difficult to distinguish real planetary signals from false alarms.

Our challenge was to design a **machine learning model** capable of analyzing NASA’s open-source datasets and predicting whether a detected signal represents:

* A **confirmed exoplanet**
* A **planetary candidate**, or
* A **false positive**

To complement this, we built an **interactive web application** that allows users to explore exoplanet data, visualize planetary systems in 3D, and understand how our model makes predictions.

---

##  Objectives

1. Develop a machine learning algorithm to classify potential exoplanet signals.
2. Process and visualize data from NASA’s open datasets.
3. Build an educational 3D simulation for users to interact with exoplanetary data.
4. Combine scientific reasoning and computational modeling to make the experience both **accurate and engaging**.

---

##  Scientific & Mathematical Foundations

Our project combines **astrophysical formulas**, **mathematical models**, and **machine learning algorithms** to create realistic simulations and accurate predictions.

### Core Theories and Formulas:

* **Kepler’s Laws of Planetary Motion**
  Describe how planets move in elliptical orbits with predictable relationships between orbital period and distance from their stars.

* **Parallax Theorem**
  Used to estimate the distance of stars and planets from Earth using angular displacement.

* **Orbital Mechanics Equations**
  Provide the basis for simulating planetary motion and determining orbital paths.

* **Logarithmic Scaling**
  Helps compress astronomical distances (measured in AU) to a manageable scale for 3D visualization without losing proportional relationships.

### Machine Learning Algorithms:

* **K-Nearest Neighbors (KNN)**
  Used to classify data points (e.g., potential exoplanet signals) based on the closest known examples in the dataset.

By combining these mathematical tools and algorithms, our model can make predictions while the visualization system brings the data to life.

---

##  Implementation

### 1. Machine Learning Model

We trained our model using features such as:

* **Orbital Period**
* **Transit Duration**
* **Planetary Radius**
* **Stellar Magnitude**
* **Signal-to-Noise Ratio**

These values were processed, normalized, and input into our ML pipeline to determine the likelihood of an exoplanet being real or a false detection.

### 2. Web Application

Our web app allows users to:

* Upload or select preloaded **NASA datasets** (Kepler, K2, TESS).
* View **3D renderings** of exoplanets using `Three.js`.
* Observe exoplanet orbits in real time with adjustable scaling.
* See machine learning predictions for planetary classification.

Sample formatted data used in our visualization:

```json
{
  "name": "Exoplanet A",
  "r": 5,
  "theta": 0,
  "phi": 90,
  "color": "red",
  "size": 0.5
}
```

Each planet’s position in 3D space is determined using **spherical coordinates** `(r, θ, φ)` converted into **Cartesian coordinates** `(x, y, z)` relative to its star.

---

##  Technologies Used

**Frontend:**

* React + Vite
* Three.js for 3D visualization
* CSS3 and modern layout design

**Backend:**

* Python (Flask)
* NumPy, Pandas, Scikit-Learn, AstroPy, Matplotlib, Astroquery

**Data Sources:**

* NASA Exoplanet Archive (Kepler, K2, TESS datasets)
* JPL Small-Body Database

---

##  Why Our Solution Works

Our solution works because it **bridges science and technology**:

* It uses **real astronomical data** and **scientifically accurate formulas**.
* It applies **machine learning** to improve efficiency and accuracy.
* It offers **interactive 3D visualizations** that make learning and discovery intuitive.

Users can visually explore exoplanets, analyze their properties, and even understand how the AI model predicts new planetary candidates. This fusion of **education**, **data science**, and **astronomy** makes our solution both engaging and informative.

---

##  Users & Use Cases

**Primary Users:**

* Students and educators exploring planetary science.
* Data scientists and astronomers analyzing NASA datasets.
* Space enthusiasts curious about exoplanets.

**Use Cases:**

1. **Educational Visualization:**
   Users can visualize exoplanet positions, sizes, and orbits.
2. **Scientific Research:**
   Researchers can classify potential exoplanets quickly using the ML model.
3. **Public Engagement:**
   Makes exoplanet discovery accessible and visually stunning.

---

##  Future Work

* Integrate **neural networks** for better classification performance.
* Include **real-time NASA API updates** for live data feeds.
* Add **exoplanet fact cards** and **orbit trail tracking**.
* Improve **scaling accuracy** using logarithmic transformations.
* Enable **collaborative data annotation** for researchers.

---

##  Team Credits

**Developed by:**
Lily, Estevan, and Team — NASA Space Apps Challenge 2024
**Organization:** Bytewise Lab

---

Would you like me to make this into a **Markdown file (`REPORT.md`)** that includes badges (like “Built with React”, “Made with NASA Data”, etc.) and automatic table of contents for GitHub display?
