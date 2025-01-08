import React from "react";
import styles from "./ActorsMovie.module.css";

const ActorsMovie = ({ actors }) => {
  return (
    <div>
      <h2 className={styles["actors-title"]}>Acteurs principaux</h2>
      <ul className={styles["actors-list"]}>
        {actors.slice(0, 10).map((actor) => (
          <li key={actor.id} className={styles["actor-item"]}>
            <img
              className={styles["actor-photo"]}
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <div className={styles["actor-info"]}>
              <p className={styles["actor-name"]}>{actor.name}</p>
              <p className={styles["actor-character"]}>
                dans le rôle de {actor.character}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorsMovie;
