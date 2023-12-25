import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

export default function SavedMovies({
  isLoading,
  movies,
  savedMovies,
  isFiltered,
  setFiltered,
  onSearch,
  onSave,
  onDelete,
  savedMoviesPath,
  setSearching, 
  errorMessage
}) {
  function toggleFilterSavedMovies() {
    setFiltered(document.getElementById("search-type").checked);
  }

  return (
    <main className="saved-movies">
      <SearchForm
        isFiltered={isFiltered}
        onSearch={onSearch}
        onFilterButton={toggleFilterSavedMovies}
        savedMoviesPath={savedMoviesPath}
        setSearching={setSearching}
      />
      <MoviesCardList
        errorMessage={errorMessage}
        isLoading={isLoading}
        movies={movies}
        savedMovies={savedMovies}
        isFiltered={isFiltered}
        onSave={onSave}
        onDelete={onDelete}
        savedMoviesPath={savedMoviesPath}
      />
    </main>
  );
}
