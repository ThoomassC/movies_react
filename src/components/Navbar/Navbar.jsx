import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import "./Navbar.css";

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav>
      <Link to="/" className="nav-title">
        Filmanéo
      </Link>
      <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
    </nav>
  );
};

export default Navbar;
