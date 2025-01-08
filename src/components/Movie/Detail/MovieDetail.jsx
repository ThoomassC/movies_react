import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../../../services/movies";
import Snackbar from "../../global/Snackbar/Snackbar";
import { useWishlist } from "../../../context/WishlistContext";
import MovieRecommendations from "../Recommendations/MovieRecommendations";
import ActorsMovie from "../Actors/ActorsMovie";
import styles from "./MovieDetail.module.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [error, setError] = useState(false);
  const { wishlist, addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(id);
        if (!movieData) {
          throw new Error("Movie not found");
        }
        setMovie(movieData);
        const creditsData = await getMovieCredits(id);
        setActors(creditsData.cast.slice(0, 10));
      } catch (error) {
        console.error("Erreur lors du chargement du film :", error);
        setError(true);
        showSnackbar("Erreur lors du chargement du film :", "error");
      }
    };

    fetchMovieDetails();
  }, [id]);

  const showSnackbar = (message, type) => {
    setSnackbar({ message, type, visible: true });
    setTimeout(() => {
      setSnackbar({ message: "", type: "", visible: false });
    }, 5000);
  };

  const handleAddToWishlist = () => {
    addToWishlist(movie);
    showSnackbar("Ajouté à la liste de souhaits", "success");
  };

  if (error)
    return (
      <div className={styles["message-container"]}>
        <div className={styles.message + " " + styles.error}>
          Erreur lors du chargement du film.
        </div>
        {snackbar.visible && (
          <Snackbar
            message={snackbar.message}
            type={snackbar.type}
            onClose={() =>
              setSnackbar({ message: "", type: "", visible: false })
            }
          />
        )}
      </div>
    );
  if (!movie)
    return (
      <div className={styles["message-container"]}>
        <div className={styles.message + " " + styles.loading}>
          Chargement en cours...
        </div>
      </div>
    );

  const isInWishlist = wishlist.some((item) => item.id === movie.id);

  return (
    <div className={styles["movie-detail-page"]}>
      <div className={styles["movie-detail-container"]}>
        <div className={styles["movie-header"]}>
          <img
            className={styles["movie-poster"]}
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={styles["movie-info-container"]}>
            <h1 className={styles["movie-title"]}>{movie.title}</h1>
            <p className={styles["movie-overview"]}>{movie.overview}</p>
            <p className={styles["movie-rating"]}>
              Note moyenne : {movie.vote_average}
            </p>
          </div>
        </div>
        <button
          className={`${styles["wishlist-button"]} ${
            isInWishlist ? styles["disabled"] : ""
          }`}
          onClick={handleAddToWishlist}
          disabled={isInWishlist}
        >
          {isInWishlist
            ? "Déjà dans la liste de souhaits"
            : "Ajouter à la liste de souhaits"}
        </button>
        <ActorsMovie actors={actors} />
        {snackbar.visible && (
          <Snackbar
            message={snackbar.message}
            type={snackbar.type}
            onClose={() =>
              setSnackbar({ message: "", type: "", visible: false })
            }
          />
        )}
      </div>
      <MovieRecommendations movieId={id} />
    </div>
  );
};

export default MovieDetail;
