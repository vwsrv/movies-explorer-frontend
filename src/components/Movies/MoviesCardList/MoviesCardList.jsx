import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import useResize from "../../../hooks/useResize";
import { useState } from "react";
import { MOBILE_SCREEN_SZ } from "../../../utils/screenBreakpoints";
import { useEffect } from "react";

export default function MoviesCardList({
  isLoading,
  movies,
  onSave,
  onDelete,
  isFiltered,
  savedMovies,
  savedMoviesPath,
  errorMessage,
  searchedMovies,
}) {
  const { width } = useResize();
  const [visibleMovies, setVisibleMovies] = useState(
    width >= MOBILE_SCREEN_SZ ? 12 : 5
  );
  const defaultScreenSize = width >= MOBILE_SCREEN_SZ;

  function handleLoadMore() {
    if (defaultScreenSize) {
      setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 3);
    } else {
      setVisibleMovies((prevVisibleMovies) => prevVisibleMovies + 2);
    }
  }

  function filterMovies() {
    if (isFiltered) {
      return movies.filter((movie) => movie.duration <= 40);
    } else {
      return movies;
    }
  }

  useEffect(() => {
    setVisibleMovies(defaultScreenSize ? 12 : 5);
  }, [defaultScreenSize]);

  const beastFilmCards = filterMovies().slice(0, visibleMovies);
  const userMovies = filterMovies();
  const moviesCards = savedMoviesPath ? userMovies : beastFilmCards;
  const moreButtonClassName =
    !savedMoviesPath && !isLoading && visibleMovies <= movies.length;

  return (
    <section className="movies-cards">
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="movies-cards--items">
          {movies.length > 0 ? (
            moviesCards.map((movie) => (
              <MoviesCard
                key={movie.id || movie._id}
                movie={movie}
                onSave={onSave}
                onDelete={onDelete}
                savedMovies={savedMovies}
                savedMoviesPath={savedMoviesPath}
              />
            ))
          ) : (
            <p className="movies-cards--items__notfound">
              {!savedMoviesPath
                ? errorMessage
                  ? errorMessage
                  : "Здесь пока ничего нет. Введите название фильма в поисковой строке, либо попробуйте изменить запрос."
                : "У вас нет сохраненных фильмов."}
            </p>
          )}
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
