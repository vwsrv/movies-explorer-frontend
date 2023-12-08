import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { useState } from "react";

export default function Movies({ cards, isLoading, onSearch }) {
  const [isMoviesFiltered, setMoviesFiltered] = useState(false);

  function toggleButtonClick() {
    setMoviesFiltered(document.getElementById("search-type").checked);
  }

  function searchMovie(text) {
    onSearch(text);
  }

  return (
    <main className="movies">
      <SearchForm onFilterButtonClick={toggleButtonClick} onSearch={searchMovie} />
      <MoviesCardList
        moviesCards={cards}
        isLoading={isLoading}
        isFiltered={isMoviesFiltered}
      />
    </main>
  );
}
