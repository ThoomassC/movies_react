import React, { useEffect, useState } from "react";
import { getMovieRecommendations } from "../../../services/movies";
import "./MovieRecommendations.css";

const MovieRecommendations = ({ movieId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getMovieRecommendations(movieId);
        setRecommendations(data.results || []);
      } catch (error) {
        console.error("Erreur lors du chargement des recommandations :", error);
      }
    };

    fetchRecommendations();
  }, [movieId]);

  return (
    <div className="recommendations-container">
      <h2>Recommandations</h2>
      <div className="recommendations-list">
        {recommendations.map((movie, index) => (
          <React.Fragment key={movie.id}>
            <div className="recommendation-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={() => (window.location.href = `/movie/${movie.id}`)}
              />
              <div className="recommendation-info">
                <h3>{movie.title}</h3>
                <p className="recommendation-overview">{movie.overview}</p>
              </div>
            </div>
            {index < recommendations.length - 1 && <hr className="divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
