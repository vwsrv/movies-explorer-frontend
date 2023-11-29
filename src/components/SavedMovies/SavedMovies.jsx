import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import SearchForm from "../Movies/SearchForm/SearchForm"

export default function SavedMovies() {
    return (
    <section className="saved__movies">
        <SearchForm />
        <MoviesCardList />
    </section>
    )
}