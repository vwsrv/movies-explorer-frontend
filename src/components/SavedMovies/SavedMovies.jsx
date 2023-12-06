import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import SearchForm from "../Movies/SearchForm/SearchForm"

export default function SavedMovies() {
    return (
    <main className="saved-movies">
        <SearchForm />
        <MoviesCardList />
    </main>
    )
}