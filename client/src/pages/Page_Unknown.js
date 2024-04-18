// lorsque La page demandée n'existe pas
import React from "react";
import { Link } from "react-router-dom";
// import "../styles/pages/Unknown.scss"; soon

export default function Unknown() {
  return (
    <div className="unknown">
      <h1>404</h1>
      <p>La page demandée n'existe pas</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}
