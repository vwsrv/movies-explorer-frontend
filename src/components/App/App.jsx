import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { movies } from "../../utils/MoviesApi";

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesCards, setMoviesCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    movies
      .getMoviesCards()
      .then((res) => {
        setMoviesCards(res);
      })
      .catch((error) => {
        console.log(`Ошибка загрузки карточек с фильмами ${error}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleLogin() {
    setIsLoggedIn(true);
    navigate("/", { replace: true });
  }

  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  }

  function handleSearchMovie(text) {
    const searchedMovies = moviesCards.filter((movie) => {
      const nameRU = movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN.toLowerCase();
      const searchText = text.toLowerCase();

      return nameRU.includes(searchText) || nameEN.includes(searchText);
    });
    setMoviesCards(searchedMovies);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Main />} />
          <Route
            path="movies"
            element={<Movies cards={moviesCards} isLoading={isLoading} onSearch={handleSearchMovie} />}
          />
          <Route path="saved-movies" element={<SavedMovies />} />
          <Route path="profile" element={<Profile onLogout={handleLogout} />} />
          <Route path="signin" element={<Login onLogin={handleLogin} />} />
          <Route path="signup" element={<Register />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
