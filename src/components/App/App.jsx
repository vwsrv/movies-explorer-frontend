import * as token from "../../utils/token";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { movies } from "../../utils/MoviesApi";
import { ProtectedRouteElement } from "../../utils/ProtectedRoute";
import { userApi } from "../../utils/MainApi";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

export default function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesCards, setMoviesCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedResults = localStorage.getItem("searched-movies");
    if (savedResults) {
      const savedMoviesList = JSON.parse(savedResults);
      setMoviesCards(savedMoviesList);
    }
  }, [isLoading]);

  function getMoviesContent() {
    setIsLoading(true);
    movies
      .getMoviesCards()
      .then((res) => {
        localStorage.setItem("movies-list", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(`Ошибка загрузки карточек с фильмами ${err}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSearchMovie(text) {
    getMoviesContent();
    const savedMovies = JSON.parse(localStorage.getItem("movies-list"));
    const searchedMovies = savedMovies.filter((movie) => {
      const nameRU = movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN.toLowerCase();
      const searchText = text.toLowerCase();
      return nameRU.includes(searchText) || nameEN.includes(searchText);
    });
    localStorage.setItem("searched-movies", JSON.stringify(searchedMovies));
  }

  function handleRegister(email, password, name) {
    userApi
      .regiter(email, password, name)
      .then(() => {
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(`Произошла ошибка при регистрации пользователя: ${err}.`);
      });
  }

  function handleLogin(email, password) {
    userApi
      .login(email, password)
      .then((res) => {
        token.setToken(res._id);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка при выполнении входа: ${err}.`);
      });
  }

  function handleLogout() {
    token.removeToken();
    navigate("/signin", { replace: true });
  }

  useEffect(() => {
    const userId = token.getToken();

    if (userId) {
      setIsLoggedIn(true);
      userApi
        .getUserInfo(userId)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(`Ошибка при получении данных о пользователе: ${err}.`);
        });
    }
  }, [isLoggedIn]);

  function handleUpdateUser( email, name ) {
    userApi
      .updateUserInfo( email, name )
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка при обновалении данных пользователя: ${err}`
        );
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={isLoggedIn} />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Main />} />
          <Route
            path="movies"
            element={
              <ProtectedRouteElement
                loggedIn={isLoggedIn}
                element={Movies}
                cards={moviesCards}
                isLoading={isLoading}
                onSearch={handleSearchMovie}
              />
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRouteElement
                loggedIn={isLoggedIn}
                element={SavedMovies}
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                onLogout={handleLogout}
                loggedIn={isLoggedIn}
                onUpdateUser={handleUpdateUser}
              />
            }
          />
          <Route path="signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="signup"
            element={<Register onRegister={handleRegister} />}
          />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
