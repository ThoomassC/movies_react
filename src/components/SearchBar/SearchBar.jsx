import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className={styles["search-bar"]}>
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles["search-input"]}
      />
    </div>
  );
};

export default SearchBar;
