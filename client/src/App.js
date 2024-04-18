import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Autentification from "./pages/Page_Authentification";
import AddFilm from "./pages/Page_AddFilm";
import Unknown from "./pages/Page_Unknown";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Autentification />} />
        <Route path="/addfilm" element={<AddFilm />} />
        <Route path="*" element={<Unknown />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
