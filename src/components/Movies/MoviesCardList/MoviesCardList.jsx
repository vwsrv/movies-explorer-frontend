import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  movies,
  isSearching,
  onSave,
  onDelete,
  onLoadMore,
  getMovie,
  visibleMovies,
  savedMovies,
}) {
  const location = useLocation();
  const savedMoviespath = location.pathname === "/saved-movies";
  const moreButtonController =
    !savedMoviespath && !isSearching && visibleMovies < movies.length;

  return (
    <section className="movies-cards">
      {isSearching ? (
        <Preloader />
      ) : (
        <div className="movies-cards--items">
          {movies.length > 0 ? (
            getMovie().map((movie) => (
              <MoviesCard movie={movie} key={movie._id || movie.id} savedMovieId={movie} savedMovies={savedMovies} onSave={onSave} onDelete={onDelete} />
            ))
          ) : (
            <p className="movies-cards--items__notfound">Здесь пока ничего нет. Введите название фильма в поисковой строке</p>
          )}
        </div>
      )}
      {moreButtonController && (
        <button
          type="button"
          className="movies-cards--btn"
          onClick={onLoadMore}
        >
          Ещё
        </button>
      )}
    </section>
  );
}
