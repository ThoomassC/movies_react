import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import "./Navbar.css";

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
    </nav>
  );
};

export default Navbar;
