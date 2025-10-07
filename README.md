# AI-Exo-Planets
# 🌌 Exo-Existence

**Exo-Existence** is an interactive web application that helps users **learn about exoplanets** through real NASA data, **3D visualizations**, and **machine learning**.  
Our project combines data from **NASA’s Kepler**, **TESS**, and the **NASA Exoplanet Archive** to simulate planetary systems, explore detailed information about exoplanets, and even help identify new ones.

---

## 🚀 Project Overview

Exo-Existence allows users to:
- Explore **3D simulations** of real exoplanets using **Three.js** and **React**.  
- Upload `.csv` or `.json` files in the correct format to **render exoplanets** in 3D.  
- View close-up visuals, facts, and characteristics of each planet.  
- Use our **machine learning model** to analyze raw data and identify possible new exoplanets.  
- Learn how variables like **orbital period**, **transit duration**, and **planetary radius** affect exoplanet classification.

---

## 🧠 Problem Statement

Finding new exoplanets in the vast amount of telescope data is difficult and time-consuming. Scientists must look through huge datasets to separate **real planets** from **false signals**.  
Our challenge was to create a **machine learning model** trained on NASA’s open-source data to identify new exoplanets and a **web interface** that lets users interact with the data in an educational way.

---

## 💡 Why Our Solution Works

Our solution combines **data science**, **physics**, and **interactive design**:
- We use **Kepler’s Laws of Planetary Motion** and **the Parallax Theorem** to calculate positions and distances.  
- A **K-Nearest Neighbors (KNN)** machine learning algorithm helps classify exoplanet data.  
- We scale orbital data with **logarithmic formulas** to create realistic 3D visualizations.  
- The web app renders each exoplanet on a **3D Cartesian plane**, allowing real-time exploration.  
- Users can either upload their own formatted `.csv` or `.json` files, or use our **default NASA dataset**.

---

## 🧾 Datasets Used

We used real open-source data from:
1. **NASA Kepler Mission** – measured tiny dips in star brightness to find exoplanets.
2. **NASA TESS Mission** – observed nearly the whole sky for planets around bright nearby stars.
3. **NASA Exoplanet Archive** – provided labeled data on confirmed exoplanets, candidates, and false positives.

From these datasets we used values like:
- Orbital period  
- Transit depth and duration  
- Planetary radius  
- Right ascension and declination  
- Distance from Earth  

All datasets are available under NASA’s Open Data policy.

---

## 🧩 Solution Overview

We built **Exo-Existence** using both **frontend** and **backend** technologies.

**Frontend:**  
- `JSX`, `CSS`, `Vite`, `React`, `Three.js`  
- Displays exoplanets in a 3D simulation  
- Includes image and render carousels made with **Embla Carousel**

**Backend / AI Components:**  
- `Python`, `NumPy`, `Pandas`, `Astropy`, `Lightkurve`, `Astroquery`, `Scikit-learn`, `Matplotlib`  
- Cleans, filters, and analyzes `.csv` data from NASA  
- Trains machine learning models to classify exoplanet data  

We followed the **Software Development Life Cycle (SDLC)** to ensure a clean, well-structured, and high-quality project.

---

## 💻 How It Works

1. Users upload a `.csv` file containing data like:
   ```json
   { "name": "Exoplanet A", "r": 5, "theta": 0, "phi": 90, "color": "red", "size": 0.5 }
   Absolutely! Here’s a **clean, detailed README.md** (GitHub-ready) for your project **Exo-Existence**.
It’s formatted in Markdown, professional yet clear enough for a middle-school-to-high-school audience, and includes badges, descriptions, setup instructions, and project sections.

---

````markdown
# 🌌 Exo-Existence

**Exo-Existence** is an interactive web application that helps users **learn about exoplanets** through real NASA data, **3D visualizations**, and **machine learning**.  
Our project combines data from **NASA’s Kepler**, **TESS**, and the **NASA Exoplanet Archive** to simulate planetary systems, explore detailed information about exoplanets, and even help identify new ones.

---

## 🚀 Project Overview

Exo-Existence allows users to:
- Explore **3D simulations** of real exoplanets using **Three.js** and **React**.  
- Upload `.csv` or `.json` files in the correct format to **render exoplanets** in 3D.  
- View close-up visuals, facts, and characteristics of each planet.  
- Use our **machine learning model** to analyze raw data and identify possible new exoplanets.  
- Learn how variables like **orbital period**, **transit duration**, and **planetary radius** affect exoplanet classification.

---

## 🧠 Problem Statement

Finding new exoplanets in the vast amount of telescope data is difficult and time-consuming. Scientists must look through huge datasets to separate **real planets** from **false signals**.  
Our challenge was to create a **machine learning model** trained on NASA’s open-source data to identify new exoplanets and a **web interface** that lets users interact with the data in an educational way.

---

## 💡 Why Our Solution Works

Our solution combines **data science**, **physics**, and **interactive design**:
- We use **Kepler’s Laws of Planetary Motion** and **the Parallax Theorem** to calculate positions and distances.  
- A **K-Nearest Neighbors (KNN)** machine learning algorithm helps classify exoplanet data.  
- We scale orbital data with **logarithmic formulas** to create realistic 3D visualizations.  
- The web app renders each exoplanet on a **3D Cartesian plane**, allowing real-time exploration.  
- Users can either upload their own formatted `.csv` or `.json` files, or use our **default NASA dataset**.

---

## 🧾 Datasets Used

We used real open-source data from:
1. **NASA Kepler Mission** – measured tiny dips in star brightness to find exoplanets.
2. **NASA TESS Mission** – observed nearly the whole sky for planets around bright nearby stars.
3. **NASA Exoplanet Archive** – provided labeled data on confirmed exoplanets, candidates, and false positives.

From these datasets we used values like:
- Orbital period  
- Transit depth and duration  
- Planetary radius  
- Right ascension and declination  
- Distance from Earth  

All datasets are available under NASA’s Open Data policy.

---

## 🧩 Solution Overview

We built **Exo-Existence** using both **frontend** and **backend** technologies.

**Frontend:**  
- `JSX`, `CSS`, `Vite`, `React`, `Three.js`  
- Displays exoplanets in a 3D simulation  
- Includes image and render carousels made with **Embla Carousel**

**Backend / AI Components:**  
- `Python`, `NumPy`, `Pandas`, `Astropy`, `Lightkurve`, `Astroquery`, `Scikit-learn`, `Matplotlib`  
- Cleans, filters, and analyzes `.csv` data from NASA  
- Trains machine learning models to classify exoplanet data  

We followed the **Software Development Life Cycle (SDLC)** to ensure a clean, well-structured, and high-quality project.

---

## 💻 How It Works

1. Users upload a `.csv` file containing data like:
   ```json
   { "name": "Exoplanet A", "r": 5, "theta": 0, "phi": 90, "color": "red", "size": 0.5 }
````

2. The program parses the data using Python and sorts it by radius, distance, or other parameters.
3. The React + Three.js frontend takes the formatted data and renders exoplanets in 3D space.
4. The machine learning model predicts whether each data point is a **confirmed exoplanet**, **candidate**, or **false positive**.
5. Users can visualize and compare the results directly on the web interface.

---

## 🌠 Features

* 🌎 **3D Simulation:** Interactive orbiting planets in real scale
* 📊 **Machine Learning:** Classifies exoplanet data from NASA archives
* 📂 **Data Upload:** Supports `.csv` and `.json` formats
* 🧮 **Scientific Formulas:** Uses Kepler’s Laws and Parallax calculations
* 🪐 **Visualization Tools:** Explore, rotate, and learn from real datasets
* 📸 **Image Carousel:** Custom-built Embla carousel for exoplanet renders

---

## 🧪 Technologies Used

| Area             | Tools & Libraries                                      |
| ---------------- | ------------------------------------------------------ |
| Frontend         | React, Vite, JSX, CSS, Three.js, Embla Carousel        |
| Backend / Data   | Python, NumPy, Pandas, Astropy, Lightkurve, Astroquery |
| Machine Learning | Scikit-learn, Matplotlib                               |
| Data Sources     | NASA Kepler, TESS, and Exoplanet Archive               |
| Methodology      | SDLC (Software Development Life Cycle)                 |

---

## 👩‍💻 Team

**Team Name:** Exo-Existence
**Member:** Lily
**Project:** AI and 3D Visualization of Exoplanets
**Contact:** [Insert contact email here]

---

## 🧭 Future Improvements

* Add orbit trails and rotation animations for each planet
* Use more advanced AI models (like Random Forest or Neural Networks)
* Allow users to visualize entire star systems with multiple planets
* Add mobile support and better 3D performance

---

## 🛰️ How to Run the Project

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend (Python)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Make sure your data files (`.csv` or `.json`) are in the correct format before uploading!

---

## 📜 License

This project uses **NASA’s Open Data** and is shared for educational purposes under the **MIT License**.

---





<img width="293" height="263" alt="Capture" src="https://github.com/user-attachments/assets/cbf2efa8-3b44-4824-9377-860d8a01b7c2" />


<img width="1044" height="673" alt="Screenshot_2025-10-05_at_10 15 44_PM" src="https://github.com/user-attachments/assets/ea37a3f7-b158-4016-a8f5-1f6376b6c573" />

<img width="1044" height="673" alt="Screenshot_2025-10-05_at_10 07 15_PM" src="https://github.com/user-attachments/assets/f8dc7d1b-b7be-4c36-bc7b-00b5db883cee" />
<img width="718" height="832" alt="Screenshot_2025-10-05_at_23 47 04" src="https://github.com/user-attachments/assets/fd7afb5d-551d-42b7-a7b9-af023df63dfe" />
<img width="1213" height="791" alt="Screenshot_2025-10-05_at_23 56 29" src="https://github.com/user-attachments/assets/4ab759bc-ea0f-4781-86e3-b38eec4b7f9a" />
<img width="1210" height="792" alt="Screenshot_2025-10-05_at_23 56 44" src="https://github.com/user-attachments/assets/d70f515a-f087-4c59-8cf2-14a1b8ff109f" />
<img width="1207" height="794" alt="Screenshot_2025-10-05_at_23 57 34" src="https://github.com/user-attachments/assets/f4d0c0b7-6600-4611-b7d5-0dc64eb8e1cc" />
