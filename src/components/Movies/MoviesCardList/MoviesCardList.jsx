import { useState } from "react";
import { useResize } from "../../../hooks/useResize";
import { MOBILE_SCREEN_SZ } from "../../../utils/screenBreakpoints";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movieCard, isLoading }) {
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

  return (
    <section className="movies-cards">
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="movies-cards--items">
          {movieCard
            .slice(0, visibleMovies)
            .map(({ id, nameRU, image, duration, trailerLink }) => (
              <MoviesCard
                key={id}
                movieName={nameRU}
                movieLink={image.url}
                movieDuration={duration}
                trailerLink={trailerLink}
              />
            ))}
        </div>
      )}
      {visibleMovies < movieCard.length && (
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
