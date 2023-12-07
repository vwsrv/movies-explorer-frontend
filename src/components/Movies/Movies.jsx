import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";

export default function Movies({ cards }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movieCard={cards} />
      <Preloader />
    </main>
  );
}
