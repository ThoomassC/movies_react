import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/popular?api_key=${apiKey}`
    );

    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des films populaires :",
      error
    );
    throw new Error("Erreur lors de la récupération des films populaires");
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des détails du film ID ${movieId} :`,
      error
    );
    throw new Error(
      `Erreur lors de la récupération des détails du film ID ${movieId}`
    );
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des crédits du film ID ${movieId} :`,
      error
    );
    throw new Error(
      `Erreur lors de la récupération des crédits du film ID ${movieId}`
    );
  }
};
