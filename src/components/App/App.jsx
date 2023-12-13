import * as token from "../../utils/token";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import useResize from "../../hooks/useResize";
import { MOBILE_SCREEN_SZ } from "../../utils/screenBreakpoints";

export default function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [moviesCards, setMoviesCards] = useState([]);
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  const [isSearching, setSearching] = useState(false);
  const [isMoviesFiltered, setMoviesFiltered] = useState(false);
  const { width } = useResize();
  const [visibleMoviesDefault, setVisibleMoviesDefault] = useState(12);
  const [visibleMoviesMobile, setVisibleMoviesMobile] = useState(5);
  const defaultScreenSize = width >= MOBILE_SCREEN_SZ;
  const visibleMovies = defaultScreenSize
    ? visibleMoviesDefault
    : visibleMoviesMobile;
  const [deleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const searchedResults = localStorage.getItem("searched-movies");
    if (searchedResults) {
      const searchedMoviesList = JSON.parse(searchedResults);
      setMoviesCards(searchedMoviesList);
    }
  }, [isSearching]);

  useEffect(() => {
    movies
      .getMoviesCards()
      .then((moviesData) => {
        localStorage.setItem("movies-list", JSON.stringify(moviesData));
      })
      .catch((err) => {
        console.log(`Ошибка загрузки карточек с фильмами ${err}.`);
      })
      .finally(() => {
        setSearching(false);
      });
  }, [isSearching]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      Promise.all([userApi.getUserInfo(userId), userApi.getSavedMoviesCards()])
        .then(([userData, savedMoviesData]) => {
          setCurrentUser(userData);
          setSavedMoviesCards(savedMoviesData.data);
        })
        .catch((err) => {
          console.log(`Ошибка загрузки данных пользователя: ${err}.`);
        });
    }
  }, [isLoggedIn]);

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

  function handleUpdateUserInfo(email, name) {
    userApi
      .updateUserInfo(email, name)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
      })
      .catch((err) => {
        console.log(
          `Возникла ошибка при обновалении данных пользователя: ${err}`
        );
      });
  }

  function handleSearchMovie(text) {
    setSearching(true);
    const savedMovies = JSON.parse(localStorage.getItem("movies-list"));
    const searchedMovies = savedMovies.filter((movie) => {
      const nameRU = movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN.toLowerCase();
      const searchText = text.toLowerCase();
      return nameRU.includes(searchText) || nameEN.includes(searchText);
    });
    localStorage.setItem("searched-movies", JSON.stringify(searchedMovies));
  }

  function handleSaveMovie(movieCard) {
    userApi
      .saveMovie(movieCard)
      .then((movieCard) => {
        setSavedMoviesCards([movieCard, ...savedMoviesCards]);
      })
      .catch((err) => {
        console.log(`Возникла ошибка при добавлении карточки: ${err}`);
      });
  }

  function handleDeleteMovie(movie) {
    userApi
      .deleteMovie(movie._id || movie)
      .then((movieCard) => {
        const updatedMovies = savedMoviesCards.filter((card) => card._id !== movieCard._id);
        setSavedMoviesCards(updatedMovies);
        setIsDeleted(true);
      })
      .catch((err) => {
        console.log(`Возникла ошибка при удалении фильма из избранного: ${err}`);
      });
  }

  function toggleButtonClick() {
    setMoviesFiltered(document.getElementById("search-type").checked);
  }

  function handleLoadMore() {
    if (defaultScreenSize) {
      setVisibleMoviesDefault(visibleMoviesDefault + 3);
    }
    return setVisibleMoviesMobile(visibleMoviesMobile + 2);
  }

  function handleFilterMovies(movies) {
    return movies.filter((movie) => movie.duration <= 60);
  }

  function filterAndLimitMovies(movies, isFiltered) {
    let filteredMovies = movies;
    if (isFiltered) {
      filteredMovies = handleFilterMovies(filteredMovies);
    }
    return filteredMovies.slice(0, visibleMovies);
  }

  function getMoviesCard() {
    return filterAndLimitMovies(moviesCards, isMoviesFiltered);
  }

  function getSavedMoviesCard() {
    return filterAndLimitMovies(savedMoviesCards, isMoviesFiltered);
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
                element={Movies}
                onSearch={handleSearchMovie}
                onLoadMore={handleLoadMore}
                onFilter={handleFilterMovies}
                getMovie={getMoviesCard}
                onFilterButtonClick={toggleButtonClick}
                loggedIn={true}
                movies={moviesCards}
                isSearching={isSearching}
                visibleMovies={visibleMovies}
                isFiltered={isMoviesFiltered}
                savedMovies={savedMoviesCards}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
              />
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                onSave={handleDeleteMovie}
                onDelete={handleDeleteMovie}
                onSearch={handleSearchMovie}
                onLoadMore={handleLoadMore}
                onFilter={handleFilterMovies}
                getMovie={getSavedMoviesCard}
                onFilterButtonClick={toggleButtonClick}
                loggedIn={true}
                movies={savedMoviesCards}
                isSearching={isSearching}
                visibleMovies={visibleMovies}
                isFiltered={isMoviesFiltered}
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
                onUpdateUser={handleUpdateUserInfo}
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
