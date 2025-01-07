import React from "react";
import "./Snackbar.css";

const Snackbar = ({ message, type, onClose }) => {
  return (
    <div className={`snackbar ${type}`}>
      {message}
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default Snackbar;
