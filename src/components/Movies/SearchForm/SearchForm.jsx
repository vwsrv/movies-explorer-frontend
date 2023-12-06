export default function SearchForm() {
  return (
    <div className="search">
      <form className="search__form">
        <div className="search__field">
          <input
            id="movie-text"
            type="text"
            className="search__input"
            placeholder="Фильм"
            required={true}
          />
          <button className="search__form-btn" type="button"></button>
        </div>
        <label htmlFor="search-type" className="search__toggle">
          <input
            type="checkbox"
            className="search__checkbox"
            id="search-type"
          />
          <span className="search__span">Короткометражки</span>
        </label>
      </form>
    </div>
  );
}
