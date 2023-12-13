import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies({
  movies,
  isSearching,
  onSearch,
  onFilterButtonClick,
  isFiltered,
  onLoadMore,
  onFilterClick,
  getMovie,
  visibleMovies,
  isLiked,
  savedMovies,
  onSave,
  onDelete
}) {
  return (
    <main className="movies">
      <SearchForm
        onFilterButtonClick={onFilterButtonClick}
        onSearch={onSearch}
      />
      <MoviesCardList
        isLiked={isLiked}
        movies={movies}
        isSearching={isSearching}
        isFiltered={isFiltered}
        onLoadMore={onLoadMore}
        onFilter={onFilterClick}
        getMovie={getMovie}
        visibleMovies={visibleMovies}
        savedMovies={savedMovies}
        onSave={onSave}
        onDelete={onDelete}
      />
    </main>
  );
}
