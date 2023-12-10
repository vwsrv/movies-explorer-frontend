import { useState } from "react";
import { useResize } from "../../../hooks/useResize";
import { MOBILE_SCREEN_SZ } from "../../../utils/screenBreakpoints";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ moviesCards, isLoading, isFiltered }) {
  const { width } = useResize();
  const [visibleMoviesDefault, setVisibleMoviesDefault] = useState(12);
  const [visibleMoviesMobile, setVisibleMoviesMobile] = useState(5);
  const defaultScreenSize = width >= MOBILE_SCREEN_SZ;
  const visibleMovies = defaultScreenSize
    ? visibleMoviesDefault
    : visibleMoviesMobile;

  function loadMoreMovies() {
    if (defaultScreenSize) {
      setVisibleMoviesDefault(visibleMoviesDefault + 3);
    }
    return setVisibleMoviesMobile(visibleMoviesMobile + 2);
  }

  function filterMoviesByDuration(movies) {
    return movies.filter((movie) => movie.duration <= 60);
  }

  function getMoviesCard() {
    let filteredMovies = moviesCards;
    if (isFiltered) {
      filteredMovies = filterMoviesByDuration(filteredMovies);
    }
    return filteredMovies.slice(0, visibleMovies);
  }

  return (
    <section className="movies-cards">
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="movies-cards--items">
          {getMoviesCard().map(
            ({ id, nameRU, image, duration, trailerLink }) => (
              <MoviesCard
                key={id}
                movieName={nameRU}
                movieLink={image.url}
                movieDuration={duration}
                trailerLink={trailerLink}
              />
            )
          )}
        </div>
      )}
      {visibleMovies < moviesCards.length && (
        <button
          type="button"
          className="movies-cards--btn"
          onClick={loadMoreMovies}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
