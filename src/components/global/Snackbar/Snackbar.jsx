import React, { useEffect } from "react";
import "./Snackbar.css";

const Snackbar = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`snackbar ${type} show`}>
      <div className="snackbar-icon">
        {type === "success" && <i className="fas fa-check-circle"></i>}
        {type === "error" && <i className="fas fa-times-circle"></i>}
      </div>
      <div className="snackbar-message">{message}</div>
      <button className="snackbar-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
