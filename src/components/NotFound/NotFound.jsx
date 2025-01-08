import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Snackbar from "../global/Snackbar/Snackbar";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const [snackbar, setSnackbar] = useState({
    message: "Erreur 404 : Page inexistante",
    type: "error",
    visible: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSnackbar({ ...snackbar, visible: false });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles["not-found"]}>
      <h1>404 - Page inexistante</h1>
      <p>Désolé, la page n'existe pas ou plus.</p>
      <Link to="/" className={styles["not-found-link"]}>
        Retourner à la page d'accueil
      </Link>
      {snackbar.visible && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar({ ...snackbar, visible: false })}
        />
      )}
    </div>
  );
};

export default NotFound;
