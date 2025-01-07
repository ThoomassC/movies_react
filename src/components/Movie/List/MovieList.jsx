import { useState, useEffect } from "react";
import { getPopularMovies } from "../../../services/movies";
import Snackbar from "../../global/Snackbar/Snackbar";
import SearchBar from "../../SearchBar/SearchBar";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
    visible: false,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();

        setMovies(data.results || []);
        showSnackbar("Films chargés", "success");
      } catch (error) {
        console.error("Erreur lors du chargement des films :", error);
        showSnackbar("Erreur lors du chargement des films :", "error");
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const showSnackbar = (message, type) => {
    setSnackbar({ message, type, visible: true });
    setTimeout(() => {
      setSnackbar({ message: "", type: "", visible: false });
    }, 3000);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Films Populaires</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              onClick={() => (window.location.href = `/movie/${movie.id}`)}
            />
            <p className="movie-info">
              <strong>Note:</strong> {movie.vote_average}
            </p>
            <p className="movie-info">
              <strong>Langue:</strong> {movie.original_language.toUpperCase()}
            </p>
            <p className="movie-info date">{movie.release_date}</p>
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

export default MovieList;
