import useLocalStorageState from "../../../hooks/useLocalStorage";

export default function SearchForm({onFilterButtonClick, onSearch, isFiltered}) {
  const [movieName, setMovieName] = useLocalStorageState('movie-name', '');
  
  function handleFilterButtonClick() {
    onFilterButtonClick();
  }

  function handleSearchMovie(e) {
    e.preventDefault();
    onSearch(movieName)
  }

  function handleInputChange(e) {
    setMovieName(e.target.value);
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSearchMovie}>
        <div className="search__field">
          <input
            id="movie-text"
            type="text"
            className="search__input"
            placeholder="Фильм"
            required={true}
            value={movieName}
            onChange={handleInputChange}
          />
          <button className="search__form-btn" type="submit"></button>
        </div>
        <label htmlFor="search-type" className="search__toggle">
          <input
            type="checkbox"
            checked={isFiltered}
            className="search__checkbox"
            id="search-type"
            onChange={handleFilterButtonClick}
          />
          <span className="search__span"></span>
          <p className="search__span--name">Короткометражки</p>
        </label>
      </form>
    </div>
  );
}
