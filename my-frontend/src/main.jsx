import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App';
import NewPage from './NewPage';
import ExoplanetPage from './exoplanetpage';
import MemberPage from './MemberPage.jsx'

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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);