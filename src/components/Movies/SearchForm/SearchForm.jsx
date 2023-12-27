import { useEffect, useState } from "react";
import useStorage from "../../../hooks/useLocalStorage";

export default function SearchForm({
  isFiltered,
  onFilterButton,
  onSearch,
  savedMoviesPath,
  setSearching
}) {
  const [moviesSearchQuery, setMoviesSearchQuery] = useStorage(
    "movies-search-query",
    ""
  );
  const [savedMoviesSearchQuery, setSavedMoviesQuery] = useState("");

  function handleInputChange(e) {
    const inputValue = e.target.value;
    if (savedMoviesPath) {
      setSavedMoviesQuery(inputValue);
    } else {
      setMoviesSearchQuery(inputValue);
    }
  }

  function searchMovie(e) {
    e.preventDefault();
    onSearch(savedMoviesPath ? savedMoviesSearchQuery : moviesSearchQuery);
  }

  useEffect(() => {
    if (savedMoviesPath) {
      setSavedMoviesQuery(savedMoviesSearchQuery);
    } else {
      setMoviesSearchQuery(moviesSearchQuery);
    }
  }, [
    savedMoviesPath,
    setMoviesSearchQuery,
    moviesSearchQuery,
    savedMoviesSearchQuery,
    setSavedMoviesQuery,
    setSearching
  ]);

  useEffect(() => {
    if (savedMoviesPath && savedMoviesSearchQuery === '') {
      setSearching(false);
    }
  })

  return (
    <div className="search">
      <form className="search__form" onSubmit={searchMovie}>
        <div className="search__field">
          <input
            id="movie-text"
            type="text"
            className="search__input"
            placeholder="Фильм"
            onChange={handleInputChange}
            value={
              !savedMoviesPath ? moviesSearchQuery : savedMoviesSearchQuery
            }
          />
          <button className="search__form-btn" type="submit"></button>
        </div>
        <label htmlFor="search-type" className="search__toggle">
          <input
            type="checkbox"
            checked={isFiltered}
            onChange={onFilterButton}
            className="search__checkbox"
            id="search-type"
          />
          <span className="search__span"></span>
          <p className="search__span--name">Короткометражки</p>
        </label>
      </form>
    </div>
  );
}
