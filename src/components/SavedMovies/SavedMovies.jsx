import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { useState } from "react";

export default function SavedMovies({
  isLoading,
  movies,
  savedMovies,
  onSearch,
  onSave,
  onDelete,
  savedMoviesPath,
  setSearching, 
  errorMessage
}) {
  const [isSavedMoviesFiltered, setSavedMoviesFiltered] = useState(false);

  function toggleFilterSavedMovies() {
    setSavedMoviesFiltered(document.getElementById("search-type").checked);
  }

  return (
    <main className="saved-movies">
      <SearchForm
        isFiltered={isSavedMoviesFiltered}
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
        isFiltered={isSavedMoviesFiltered}
        onSave={onSave}
        onDelete={onDelete}
        savedMoviesPath={savedMoviesPath}
      />
    </main>
  );
}
