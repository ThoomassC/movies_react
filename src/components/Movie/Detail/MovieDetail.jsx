import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../../../services/movies";
import Snackbar from "../../global/Snackbar/Snackbar";
import { useWishlist } from "../../../context/WishlistContext";
import MovieRecommendations from "../Recommendations/MovieRecommendations";
import ActorsMovie from "../Actors/ActorsMovie";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [error, setError] = useState(false); // Add error state
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
        setActors(creditsData.cast.slice(0, 10)); // Limit to 10 actors
      } catch (error) {
        console.error("Erreur lors du chargement du film :", error);
        setError(true); // Set error state
        showSnackbar("Erreur lors du chargement du film :", "error");
      }
    };

    fetchMovieDetails();
  }, [id]);

  const showSnackbar = (message, type) => {
    setSnackbar({ message, type, visible: true });
    setTimeout(() => {
      setSnackbar({ message: "", type: "", visible: false });
    }, 3000);
  };

  const handleAddToWishlist = () => {
    addToWishlist(movie);
    showSnackbar("Ajouté à la liste de souhaits", "success");
  };

  if (error) return <div>Erreur lors du chargement du film.</div>; // Display error message
  if (!movie) return <div>Chargement en cours...</div>;

  const isInWishlist = wishlist.some((item) => item.id === movie.id);

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-container">
        <div className="movie-header">
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-info-container">
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-overview">{movie.overview}</p>
            <p className="movie-info">
              <strong>Date de sortie :</strong> {movie.release_date}
            </p>
            <p className="movie-info">
              <strong>Note moyenne :</strong> {movie.vote_average}
            </p>
            <button
              className={`wishlist-button ${isInWishlist ? "disabled" : ""}`}
              onClick={handleAddToWishlist}
              disabled={isInWishlist}
            >
              {isInWishlist
                ? "Déjà dans la liste de souhaits"
                : "Ajouter à la liste de souhaits"}
            </button>
          </div>
        </div>
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
