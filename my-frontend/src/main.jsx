import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './index.css'
import App from './App';
import NewPage from './NewPage.jsx';
import MemberPage from './MemberPage.jsx';
import ExoplanetPage from './ExoplanetPage.jsx';
import Controlled3D from './test.jsx';
import ExoCatalog from './machine-learning.jsx';
import MLDetails from './MLDetails.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run effect when pathname changes

  return null; // This component doesn't render anything visually
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Home page */}
        <Route path="/" element={<App />} />

        {/* New blank page */}
        <Route path="/new" element={<NewPage />} />
        <Route path="/machine-learning" element={<ExoCatalog />} />
        <Route path="/ml-details" element={<MLDetails />} />
        <Route path="/exoplanetsim" element={<ExoplanetPage />} />
        <Route path="/mem" element={<MemberPage />} />
        <Route path="/test" element={<Controlled3D />} />

      </Routes>
    </Router>
  </StrictMode>
);


