import React, { useState, useEffect } from "react";
import { getPopularMovies } from "../../../services/movies";
import Snackbar from "../../global/Snackbar/Snackbar";
import SearchBar from "../../SearchBar/SearchBar";
import { useWishlist } from "../../../context/WishlistContext";
import CardMovie from "../Card/CardMovie";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(10);
  const { wishlist, addToWishlist } = useWishlist();

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

  const handleAddToWishlist = (movie) => {
    addToWishlist(movie);
    showSnackbar("Ajouté à la liste de souhaits", "success");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMoviesPerPageChange = (event) => {
    setMoviesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <div className="container">
      <h1>Films Populaires</h1>
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="pagination-controls">
        <label htmlFor="moviesPerPage">Films par page:</label>
        <select
          id="moviesPerPage"
          value={moviesPerPage}
          onChange={handleMoviesPerPageChange}
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="movie-grid">
        {currentMovies.map((movie) => {
          const isInWishlist = wishlist.some((item) => item.id === movie.id);
          return (
            <CardMovie
              key={movie.id}
              movie={movie}
              isInWishlist={isInWishlist}
              onAddToWishlist={handleAddToWishlist}
            />
          );
        })}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`pagination-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
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
