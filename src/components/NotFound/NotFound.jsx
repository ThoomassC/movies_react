import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page inexistante</h1>
      <p>Désolé, la page n'existe pas ou plus.</p>
      <Link to="/">Retourner à la page d'accueil</Link>
    </div>
  );
};

export default NotFound;
