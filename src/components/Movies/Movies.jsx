import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

export default function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
      <Preloader />
    </main>
  );
}
