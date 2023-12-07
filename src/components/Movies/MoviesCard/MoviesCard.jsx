import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MoviesCard({
  movieName,
  movieLink,
  movieDuration,
  trailerLink,
}) {
  const [isLiked, setIsLiked] = useState(false);
  const filmSaveButtonClassName = `film__like-btn ${
    isLiked && `film__like-btn_active`
  }`;
  const location = useLocation();
  const isSaved = location.pathname === "/saved-movies";
  const hours = Math.floor(movieDuration / 60);
  const mins = Math.round(movieDuration % 60);

  function toggleSave() {
    setIsLiked(!isLiked);
  }

  return (
    <ul className="film">
      <li>
        <Link to={`${trailerLink}`} target="_blank" className="film__link">
          <img
            src={`https://api.nomoreparties.co${movieLink}`}
            alt={`Постер фильма ${movieName}`}
            className="film__image"
          />
        </Link>
      </li>
      <li className="film__info">
        <h2 className="film__title">{movieName}</h2>
        <button
          type="button"
          className={isSaved ? "film__delete-btn" : filmSaveButtonClassName}
          onClick={toggleSave}
        ></button>
        <p className="film__duration">{`${hours} ч. ${mins} мин.`}</p>
      </li>
    </ul>
  );
}
