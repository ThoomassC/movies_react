import React from "react";
import styles from "./CardMovie.module.css";

const CardMovie = ({
  movie,
  isInWishlist,
  onAddToWishlist,
  onRemoveFromWishlist,
}) => {
  return (
    <div className={styles["card-movie"]}>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        onClick={() => (window.location.href = `/movie/${movie.id}`)}
        className={styles["card-movie-poster"]}
      />
      <h2 className={styles["card-movie-title"]}>{movie.title}</h2>
      <p className={styles["card-movie-overview"]}>{movie.overview}</p>
      <p className={styles["card-movie-rating"]}>
        Note moyenne : {movie.vote_average}
      </p>
      {onAddToWishlist && (
        <button
          className={`${styles["card-wishlist-button"]} ${
            isInWishlist ? styles["disabled"] : ""
          }`}
          onClick={() => onAddToWishlist(movie)}
          disabled={isInWishlist}
        >
          {isInWishlist ? "Dans les souhaits" : "+ Souhaits"}
        </button>
      )}
      {onRemoveFromWishlist && (
        <button
          className={styles["card-remove-button"]}
          onClick={() => onRemoveFromWishlist(movie.id)}
        >
          - Souhaits
        </button>
      )}
    </div>
  );
};

export default CardMovie;
