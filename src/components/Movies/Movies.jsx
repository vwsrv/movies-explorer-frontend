import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import useStorage from '../../hooks/useLocalStorage'

export default function Movies({
  isLoading,
  movies,
  savedMovies,
  onSearch,
  onSave,
  onDelete,
  savedMoviesPath,
  errorMessage,
}) {
  const [isMoviesFiltered, setMoviesFiltered] = useStorage(
    "movies-checked",
    false
  );

  function toggleFilterMovies() {
    setMoviesFiltered(document.getElementById("search-type").checked);
  }

  return (
    <main className="movies">
      <SearchForm
        onFilterButton={toggleFilterMovies}
        isFiltered={isMoviesFiltered}
        onSearch={onSearch}
        savedMoviesPath={savedMoviesPath}
      />
      <MoviesCardList
        isLoading={isLoading}
        movies={movies}
        savedMovies={savedMovies}
        isFiltered={isMoviesFiltered}
        onSave={onSave}
        onDelete={onDelete}
        savedMoviesPath={savedMoviesPath}
        errorMessage={errorMessage}
      />
    </main>
  );
}
