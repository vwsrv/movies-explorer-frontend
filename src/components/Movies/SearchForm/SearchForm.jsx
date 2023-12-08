import { useState } from "react";

export default function SearchForm({onFilterButtonClick, onSearch}) {
  const [movieName, setMovieName] = useState('');
  
  function handleFilterButtonClick() {
    onFilterButtonClick();
  }

  function handleInputChange(e) {
    setMovieName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(movieName);
  }

  return (
    <div className="search">
      <form className="search__form" onSubmit={handleSubmit}>
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
            className="search__checkbox"
            id="search-type"
            onClick={handleFilterButtonClick}
          />
          <span className="search__span">Короткометражки</span>
        </label>
      </form>
    </div>
  );
}
