import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

export default function SavedMovies({
  onFilterButtonClick,
  onSearch,
  movies,
  isSearching,
  isFiltered,
  onLoadMore,
  onFilter,
  getMovie,
  visibleMovies,
  onSave,
  onDelete,
}) {
  return (
    <main className="saved-movies">
      <SearchForm
        onFilterButtonClick={onFilterButtonClick}
        onSearc={onSearch}
      />
      <MoviesCardList
        movies={movies}
        savedMovies={movies}
        isSearching={isSearching}
        isFiltered={isFiltered}
        onLoadMore={onLoadMore}
        onFilter={onFilter}
        getMovie={getMovie}
        visibleMovies={visibleMovies}
        onSave={onSave}
        onDelete={onDelete}
      />
    </main>
  );
}
