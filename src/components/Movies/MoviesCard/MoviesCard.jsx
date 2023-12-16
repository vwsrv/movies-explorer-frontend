import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({ movie, savedMovies, onSave, onDelete }) {
  const [isSaved, setIsSaved] = useState(false);
  const filmSaveButtonClassName = `film__like-btn ${
    isSaved && `film__like-btn_active`
  }`;
  const hours = Math.floor(movie.duration / 60);
  const mins = Math.round(movie.duration % 60);
  const location = useLocation();
  const savedMoviesPath = location.pathname === "/saved-movies";

  useEffect(() => {
    const isMovieSaved = savedMovies.some(
      (savedMovie) => savedMovie.movieId === movie.id
    );
    if (isMovieSaved) {
      setIsSaved(isMovieSaved);
    } else {
      setIsSaved(false)
    }
  }, [movie, savedMovies]);

  function findSavedMovieId(savedMovies) {
    const foundMovie = savedMovies.find(
      (savedMovie) => savedMovie.movieId === movie.id
    );
    if (foundMovie) {
      return foundMovie._id;
    } else {
      return null;
    }
  }

  function toggleMovieStatus() {
    const foundMovie = findSavedMovieId(savedMovies);
    if (foundMovie) {
      return onDelete(foundMovie);
    }
    onSave(movie);
  }

  return (
    <ul className="film">
      <li>
        <Link
          to={`${movie.trailerLink}`}
          target="_blank"
          className="film__link"
        >
          <img
            src={
              !savedMoviesPath
                ? `https://api.nomoreparties.co${movie.image.url}`
                : `${movie.image}`
            }
            alt={`Постер фильма ${movie.nameRU}`}
            className="film__image"
          />
        </Link>
      </li>
      <li className="film__info">
        <h2 className="film__title">{movie.nameRU}</h2>
        <button
          onClick={toggleMovieStatus}
          type="button"
          className={
            isSaved || !savedMoviesPath
              ? filmSaveButtonClassName
              : "film__delete-btn"
          }
        ></button>
        <p className="film__duration">{`${hours} ч. ${mins} мин.`}</p>
      </li>
    </ul>
  );
}
