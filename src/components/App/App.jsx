import * as token from "../../utils/token";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { movies } from "../../utils/MoviesApi";
import { ProtectedRouteElement } from "../../utils/ProtectedRoute";
import { userApi } from "../../utils/MainApi";
import useLocalStorageState from "../../hooks/useLocalStorage";
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
  const location = useLocation();
  const savedMoviesPath = location.pathname === "/saved-movies";
  const [isLoggedIn, setIsLoggedIn] = useLocalStorageState("isLoggedIn", false);
  const [currentUser, setCurrentUser] = useLocalStorageState("currentUser", {});
  const [moviesCards, setMoviesCards] = useState([]);
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  const [isSearching, setSearching] = useState(false);
  const [isMoviesFiltered, setMoviesFiltered] = useLocalStorageState("checked", false);
  const { width } = useResize();
  const [visibleMoviesDefault, setVisibleMoviesDefault] = useState(12);
  const [visibleMoviesMobile, setVisibleMoviesMobile] = useState(5);
  const defaultScreenSize = width >= MOBILE_SCREEN_SZ;
  const visibleMovies = defaultScreenSize
    ? visibleMoviesDefault
    : visibleMoviesMobile;
  const [cardToDelete, setCardToDelete] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const searchedResults = localStorage.getItem("searched-movies");
    if (searchedResults) {
      const searchedMoviesList = JSON.parse(searchedResults);
      setMoviesCards(searchedMoviesList);
    }
  }, [isSearching]);

  useEffect(() => {
    if (isLoggedIn) {
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
    }
  }, [isSearching, isLoggedIn]);

  useEffect(() => {
    if (cardToDelete) {
      return setCardToDelete(null);
    }
    if (isLoggedIn) {
      userApi
        .getSavedMoviesCards()
        .then((userMoviesData) => {
          setSavedMoviesCards(userMoviesData.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [isLoggedIn, cardToDelete]);

  useEffect(() => {
    if (isLoggedIn) {
      userApi
        .getUserInfo(userId)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [isLoggedIn, userId, setCurrentUser]);

  function handleRegister(email, password, name) {
    userApi
      .regiter(email, password, name)
      .then(() => {
        navigate("/signin", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.message);
      });
  }

  function handleLogin(email, password) {
    userApi
      .login(email, password)
      .then((res) => {
        token.setToken(res._id);
        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage(err.message);
      });
  }

  function handleLogout() {
    token.removeToken();
    localStorage.clear();
    navigate("/signin", { replace: true });
  }

  function handleUpdateUserInfo(email, name) {
    userApi
      .updateUserInfo(email, name)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage(err.message);
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
        console.log(`${err.message}.`);
      });
  }

  function handleDeleteMovie(movie) {
    userApi
      .deleteMovie(movie._id || movie)
      .then((movieCard) => {
        const updatedMovies = savedMoviesCards.filter(
          (card) => card._id !== movieCard.id
        );
        setCardToDelete(movieCard);
        setSavedMoviesCards(updatedMovies);
      })
      .catch((err) => {
        console.log(`${err.message}.`);
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
    if (savedMoviesPath) {
      return filteredMovies;
    }
    return filteredMovies.slice(0, visibleMovies);
  }

  function getMoviesCards() {
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
                getMovie={getMoviesCards}
                onFilterButtonClick={toggleButtonClick}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                loggedIn={isLoggedIn}
                movies={moviesCards}
                isSearching={isSearching}
                visibleMovies={visibleMovies}
                isFiltered={isMoviesFiltered}
                savedMovies={savedMoviesCards}
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
                loggedIn={isLoggedIn}
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
                connectionError={errorMessage}
              />
            }
          />
          <Route
            path="signin"
            element={
              <Login onLogin={handleLogin} connectionError={errorMessage} />
            }
          />
          <Route
            path="signup"
            element={
              <Register
                onRegister={handleRegister}
                loggedIn={isLoggedIn}
                connectionError={errorMessage}
              />
            }
          />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
