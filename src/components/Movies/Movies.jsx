import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

export default function Movies() {
  return (
    <section className="section__movies">
      <SearchForm />
      <MoviesCardList />
      <Preloader />
    </section>
  );
}
