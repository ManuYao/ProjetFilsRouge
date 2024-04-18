import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Autentification from "./pages/Page_Authentification";
import AddFilm from "./pages/Page_AddFilm";
import Unknown from "./pages/Page_Unknown";
import "./styles/App.css";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Autentification />} />
        <Route path="/addfilm" element={<AddFilm />} />
        <Route path="*" element={<Unknown />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
