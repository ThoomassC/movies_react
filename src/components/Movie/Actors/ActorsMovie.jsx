import React from "react";
import "./ActorsMovie.css";

const ActorsMovie = ({ actors }) => {
  return (
    <div>
      <h2 className="actors-title">Acteurs principaux</h2>
      <ul className="actors-list">
        {actors.slice(0, 10).map((actor) => (
          <li key={actor.id} className="actor-item">
            <img
              className="actor-photo"
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
            />
            <div className="actor-info">
              <p className="actor-name">{actor.name}</p>
              <p className="actor-character">dans le rôle de {actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActorsMovie;