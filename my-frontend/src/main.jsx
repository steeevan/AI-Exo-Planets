import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App';
import NewPage from './NewPage.jsx';
import ExoplanetPage from './exoplanetpage';
import MemberPage from './MemberPage.jsx';
import RenderExoplanets from './RenderExoplanets.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<App />} />

        {/* New blank page */}
        <Route path="/new" element={<NewPage />} />

        <Route path="/exoplanetinfo" element={<ExoplanetPage />} />
        <Route path="/mem" element={<MemberPage />} />
        <Route path="/renderexo" element={<RenderExoplanets />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);


