import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import NewPage from './NewPage.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<App />} />

        {/* New blank page */}
        <Route path="/new" element={<NewPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);