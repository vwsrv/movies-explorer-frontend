import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  movies,
  isSearching,
  onLoadMore,
  getMovie,
  visibleMovies,
  savedMovies,
  savedMovieId,
  onSave,
  onDelete
}) {
  return (
    <section className="movies-cards">
      {isSearching ? (
        <Preloader />
      ) : (
        <div className="movies-cards--items">
          {getMovie().map((movie) => (
            <MoviesCard movie={movie} key={movie._id || movie.id} savedMovieId={movie} savedMovies={savedMovies} onSave={onSave} onDelete={onDelete} />
          ))}
        </div>
      )}
      {visibleMovies < movies.length && (
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
