import { Link } from "react-router-dom";

export default function MoviesCard({
  movie,
  savedMoviesPath,
  savedMovies,
  onSave,
  onDelete,
}) {
  //проверка фильмов на наличие в сохраненных
  const isSaved = savedMovies.some(
    (savedMovie) => savedMovie.movieId === movie.id
  );
  const filmSaveButtonClassName = `film__like-btn ${
    isSaved && `film__like-btn_active`
  }`;
  const hours = Math.floor(movie.duration / 60);
  const mins = Math.round(movie.duration % 60);
  //поиск в массиве сохраненых фильмов, сравнение ИД найденного элемента ИД
  //карточки, полученной с сервера. В случае успеха - добавление свойства _id этой карточке
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
    // Поиск сохраненного фильма
    const foundMovie = findSavedMovieId(savedMovies);
    // Если фильм найден или мы находимся на странице /saved-movies, вызываем onDelete
    if (foundMovie || savedMoviesPath) {
      onDelete(foundMovie ? foundMovie : movie._id);
    } else {
      // В противном случае, вызываем onSave
      onSave(movie);
    }
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
          type="button"
          onClick={toggleMovieStatus}
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
