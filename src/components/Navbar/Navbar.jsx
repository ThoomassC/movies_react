import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles["nav-title"]}>
        Filmanéo
      </Link>
      <Link to="/wishlist">Liste de souhaits ({wishlist.length})</Link>
    </nav>
  );
};

export default Navbar;
