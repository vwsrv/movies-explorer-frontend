import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import useResize from "../../../hooks/useResize";
import { useState } from "react";
import { MOBILE_SCREEN_SZ } from "../../../utils/screenBreakpoints";
import { useEffect } from "react";
import {
  DEFAULT_MOVIES_COUNT,
  SHORT_FILM_DURATION,
  MOBILE_MOVIES_COUNT,
  MOBILE_MOVIES_COUNT_TO_LAOD,
  DEFAULT_MOVIES_COUNT_TO_LOAD,
} from "../../../utils/constants";

export default function MoviesCardList({
  isLoading,
  movies,
  onSave,
  onDelete,
  isFiltered,
  savedMovies,
  savedMoviesPath,
  errorMessage,
}) {
  const { width } = useResize();
  const [visibleMovies, setVisibleMovies] = useState(
    width >= MOBILE_SCREEN_SZ ? DEFAULT_MOVIES_COUNT : MOBILE_MOVIES_COUNT
  );
  const defaultScreenSize = width >= MOBILE_SCREEN_SZ;
  const filteredMovies = filterMovies().length;
  const beastFilmCards = filterMovies().slice(0, visibleMovies);
  const userMovies = filterMovies();
  const moviesCards = savedMoviesPath ? userMovies : beastFilmCards;
  const moreButtonClassName =
    !savedMoviesPath && !isLoading && visibleMovies <= filteredMovies;

  const showEmptyState =
    (location.pathname === "/movies" && movies.length === 0) ||
    (location.pathname === "/saved-movies" && movies.length === 0) ||
    (isFiltered && filteredMovies === 0);

  function handleLoadMore() {
    if (defaultScreenSize) {
      setVisibleMovies(
        (prevVisibleMovies) => prevVisibleMovies + DEFAULT_MOVIES_COUNT_TO_LOAD
      );
    } else {
      setVisibleMovies(
        (prevVisibleMovies) => prevVisibleMovies + MOBILE_MOVIES_COUNT_TO_LAOD
      );
    }
  }

  function filterMovies() {
    if (isFiltered) {
      return movies.filter((movie) => movie.duration <= SHORT_FILM_DURATION);
    } else {
      return movies || savedMovies;
    }
  }

  useEffect(() => {
    setVisibleMovies(
      defaultScreenSize ? DEFAULT_MOVIES_COUNT : MOBILE_MOVIES_COUNT
    );
  }, [defaultScreenSize]);

  return (
    <section className="movies-cards">
      {isLoading ? (
        <Preloader />
      ) : showEmptyState ? (
        <p className="movies-cards--items__notfound">
          {isFiltered && filteredMovies === 0
            ? "Фильмов длительностью 40 минут не найдено."
            : errorMessage
            ? errorMessage
            : location.pathname === "/movies"
            ? "Здесь ничего нет, начните поиск фильмов или измените поисковый запрос."
            : location.pathname === "/saved-movies"
            ? "Здесь ничего нет, сохраните фильм, либо измените поисковый запрос."
            : null}
        </p>
      ) : (
        <div className="movies-cards--items">
          {moviesCards.map((movie) => (
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              onSave={onSave}
              onDelete={onDelete}
              savedMovies={savedMovies}
              savedMoviesPath={savedMoviesPath}
            />
          ))}
        </div>
      )}
      {moreButtonClassName && (
        <button
          type="button"
          className="movies-cards--btn"
          onClick={handleLoadMore}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
