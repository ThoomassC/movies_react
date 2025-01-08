import React, { useEffect, useState } from "react";
import { getMovieRecommendations } from "../../../services/movies";
import styles from "./MovieRecommendations.module.css";

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

  const handleCardClick = (movieId) => {
    window.location.href = `/movie/${movieId}`;
  };

  return (
    <div className={styles["recommendations-container"]}>
      <h2>Recommandations</h2>
      <div className={styles["recommendations-list"]}>
        {recommendations.map((movie, index) => (
          <React.Fragment key={movie.id}>
            <div
              className={styles["recommendation-card"]}
              onClick={() => handleCardClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <div className={styles["recommendation-info"]}>
                <h3>{movie.title}</h3>
                <p className={styles["recommendation-overview"]}>
                  {movie.overview}
                </p>
              </div>
            </div>
            {index < recommendations.length - 1 && (
              <hr className={styles.divider} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
