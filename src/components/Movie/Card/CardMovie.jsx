import React from "react";
import "./CardMovie.css";

const CardMovie = ({
  movie,
  isInWishlist,
  onAddToWishlist,
  onRemoveFromWishlist,
}) => {
  return (
    <div className="card-movie">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        onClick={() => (window.location.href = `/movie/${movie.id}`)}
        className="card-movie-poster"
      />
      <h2 className="card-movie-title">{movie.title}</h2>
      <p className="card-movie-overview">{movie.overview}</p>
      {onAddToWishlist && (
        <button
          className={`card-wishlist-button ${isInWishlist ? "disabled" : ""}`}
          onClick={() => onAddToWishlist(movie)}
          disabled={isInWishlist}
        >
          {isInWishlist
            ? "Déjà dans la liste de souhaits"
            : "Ajouter à la liste de souhaits"}
        </button>
      )}
      {onRemoveFromWishlist && (
        <button
          className="card-remove-button"
          onClick={() => onRemoveFromWishlist(movie.id)}
        >
          Retirer
        </button>
      )}
    </div>
  );
};

export default CardMovie;
