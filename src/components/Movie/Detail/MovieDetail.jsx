import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../../../services/movies";
import Snackbar from "../../global/Snackbar/Snackbar";
import { useWishlist } from "../../../context/WishlistContext";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
        const creditsData = await getMovieCredits(id);
        setActors(creditsData.cast.slice(0, 10));
      } catch (error) {
        console.error("Erreur lors du chargement du film :", error);
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

  if (!movie) return <div>Chargement en cours...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Date de sortie : {movie.release_date}</p>
      <p>Note moyenne : {movie.vote_average}</p>
      <h2>Acteurs principaux</h2>
      <ul>
        {actors.map((actor) => (
          <li key={actor.id}>
            {actor.name} dans le rôle de {actor.character}
          </li>
        ))}
      </ul>
      <button onClick={handleAddToWishlist}>
        Ajouter à la liste de souhaits
      </button>
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

export default MovieDetail;
