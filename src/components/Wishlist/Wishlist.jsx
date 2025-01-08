import React, { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import Snackbar from "../global/Snackbar/Snackbar";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const showSnackbar = (message, type) => {
    setSnackbar({ message, type, visible: true });
    setTimeout(() => {
      setSnackbar({ message: "", type: "", visible: false });
    }, 3000);
  };

  const handleRemove = (movieId) => {
    removeFromWishlist(movieId);
    showSnackbar("Film retiré de la liste de souhaits", "success");
  };

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Liste de souhaits</h1>
      <p className="wishlist-count">
        Total des films dans la liste de souhaits : {wishlist.length}
      </p>
      <div className="wishlist-grid">
        {wishlist.map((movie) => (
          <div key={movie.id} className="wishlist-card">
            <h2 className="wishlist-movie-title">{movie.title}</h2>
            <img
              className="wishlist-movie-poster"
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <p className="wishlist-movie-info">Note : {movie.vote_average}</p>
            <button
              className="wishlist-remove-button"
              onClick={() => handleRemove(movie.id)}
            >
              Retirer
            </button>
          </div>
        ))}
      </div>
      {snackbar.visible && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar({ message: "", type: "", visible: false })}
        />
      )}
    </div>
  );
};

export default Wishlist;
