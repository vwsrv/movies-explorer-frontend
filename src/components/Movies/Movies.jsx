import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies({
  isLoading,
  movies,
  savedMovies,
  setFiltered,
  isFiltered,
  onSearch,
  onSave,
  onDelete,
  savedMoviesPath,
  errorMessage,
}) {
  function toggleFilterMovies() {
    setFiltered(document.getElementById("search-type").checked);
  }

  return (
    <main className="movies">
      <SearchForm
        onFilterButton={toggleFilterMovies}
        isFiltered={isFiltered}
        onSearch={onSearch}
        savedMoviesPath={savedMoviesPath}
      />
      <MoviesCardList
        isLoading={isLoading}
        movies={movies}
        savedMovies={savedMovies}
        isFiltered={isFiltered}
        onSave={onSave}
        onDelete={onDelete}
        savedMoviesPath={savedMoviesPath}
        errorMessage={errorMessage}
      />
    </main>
  );
}
