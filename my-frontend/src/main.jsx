import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App';
import NewPage from './NewPage.jsx';
import MemberPage from './MemberPage.jsx';
import ExoplanetPage from './ExoplanetPage.jsx';
import Controlled3D from './test.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<App />} />

        {/* New blank page */}
        <Route path="/new" element={<NewPage />} />

        <Route path="/exoplanetsim" element={<ExoplanetPage />} />
        <Route path="/mem" element={<MemberPage />} />
        <Route path="/test" element={<Controlled3D />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);


