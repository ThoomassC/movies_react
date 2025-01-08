import React, { useEffect } from "react";
import styles from "./Snackbar.module.css";

const Snackbar = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.snackbar} ${styles[type]} ${styles.show}`}>
      <div className={styles["snackbar-icon"]}>
        {type === "success" && <i className="fas fa-check-circle"></i>}
        {type === "error" && <i className="fas fa-times-circle"></i>}
      </div>
      <div className={styles["snackbar-message"]}>{message}</div>
      <button className={styles["snackbar-close"]} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
