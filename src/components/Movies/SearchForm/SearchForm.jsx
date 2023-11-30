export default function SearchForm() {
  return (
    <section className="search">
      <form action="" className="search__form">
        <label htmlFor="movie-text" className="search__field">
          <input type="text" className="search__input" placeholder="Фильм" />
          <button className="search__form-btn"></button>
        </label>
      </form>
      <label htmlFor="search-type" className="search__toggle">
        <input type="checkbox" className="search__checkbox" id="search-type" />
        <span className="search__span">Короткометражки</span>
      </label>
    </section>
  );
}
