
## 🌌 **Exo-Existence – Summary**

**Overview:**

Exo-Existence is a web app that lets users explore **3D visualizations of real exoplanets** using data from  **NASA’s Kepler and TESS missions** . It combines **science, artificial intelligence, and interactivity** to make learning about space more exciting. Users can view planets orbiting their stars, see details about each world, and use AI to analyze real NASA data for possible new exoplanets.

---

## **Problem & Goal**

NASA’s telescopes gather  **huge amounts of star data** , but it’s hard for scientists to manually identify which signals are real planets and which are false.

Our goal was to:

* Use **machine learning** to classify signals as  *confirmed, candidate, or false positive* .
* Build a **web app** where users can visualize and interact with this data.

---

## **Why It Works**

The project merges  **real astrophysics and AI** :

* **Kepler’s Laws** and **orbital mechanics** determine motion and placement.
* **Parallax theorem** helps measure distance.
* **K-Nearest Neighbors (KNN)** model predicts if data represents a real planet.
* **Logarithmic scaling** keeps vast distances realistic inside the 3D viewer.

Result: users can **see** planets moving around their stars while the **AI analyzes** NASA data to help find new ones.

---

## **Users & Use Cases**

* **Students & Teachers:** visualize orbital motion and real data in class.
* **Scientists & Researchers:** upload CSV files for AI-based classification.
* **Space Enthusiasts:** explore 3D models, compare planet sizes, and learn.

---

## **Datasets Used**

* **Kepler:** star brightness dips (transits).
* **TESS:** full-sky light curves.
* **NASA Exoplanet Archive:** confirmed, candidate, and false-positive planets (for training the model).

These datasets provided real measurements like orbital period, radius, and distance.

---

## **Solution Overview**

**Frontend:** React, JSX, CSS, Vite, THREE.js – renders 3D exoplanet systems and image carousels.

**Backend:** Python with NumPy, Pandas, Astropy, Lightkurve, Astroquery, Scikit-Learn, and Matplotlib – cleans, processes, and analyzes NASA data.

**Workflow:** Followed SDLC for structure and quality.

Users can upload `.csv` or `.json` files or use our default dataset to explore accurate 3D renderings of planets.

---

### In short:

**Exo-Existence = Science + AI + Visualization.**

It brings NASA’s data to life, helps identify new worlds, and turns exoplanet exploration into an **interactive learning experience** for everyone.
