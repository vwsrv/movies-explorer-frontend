import * as token from "../../utils/token";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { ProtectedRouteElement } from "../../utils/ProtectedRoute";
import { userApi } from "../../utils/MainApi";
import { movies } from "../../utils/MoviesApi";
import useStorage from "../../hooks/useLocalStorage";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useStorage("isLoggedIn", false);
  const [currentUser, setCurrentUser] = useStorage("currentUser", {});
  const [moviesCards, setMoviesCards] = useState([]);
  const [searchedMoviesCards, setSearchedMoviesCards] = useStorage(
    "movies-cards",
    []
  );
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userApiError, setUserApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [moviesApiError, setMoviesApiError] = useState("");
  const [userMoviesApiError, setUserMoviesApiError] = useState("");
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const savedMoviesPath = location.pathname === "/saved-movies";
  const [message, setMessage] = useState({ status: true, text: "" });
  const [isStatusPopupOpen, setStatusPopupOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  function closeAllPopups() {
    setStatusPopupOpen(false);
  }

  function handleRegister(email, password, name) {
    userApi
      .register(email, password, name)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        setMessage({
          status: false,
          text: "Возникла ошибка!",
        });
        setStatusPopupOpen(true);
        setUserApiError(err.message);
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    userApi
      .login(email, password)
      .then((res) => {
        token.setToken(res._id);
        setLoggedIn(true);
        setMessage({
          status: true,
          text: "Добро пожаловать!",
        });
        setStatusPopupOpen(true);
        setSuccessMessage("Добро пожаловать!");
        navigate("/movies", { replace: true });
        localStorage.setItem("isLoggedIn", true);
      })
      .catch((err) => {
        console.log(err.message);
        setUserApiError(err.message);
        setMessage({
          status: false,
          text: "Возникла ошибка!",
        });
        setStatusPopupOpen(true);
      });
  }

  function handleLogout() {
    userApi.logout();
    token.removeToken();
    setLoggedIn(false);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  function handleUpdateUserInfo(email, name) {
    userApi
      .updateUserInfo(email, name)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        setUserApiError("");
        setSuccessMessage("Профиль обновлен!");
        setMessage({
          status: true,
          text: "Профиль обновлен!",
        });
        setStatusPopupOpen(true);
      })
      .catch((err) => {
        console.log(err.message);
        setUserApiError(err.message);
        setMessage({
          status: false,
          text: "Возникла ошибка!",
        });
        setStatusPopupOpen(true);
      });
  }

  useEffect(() => {
    if (successMessage) {
      setUserApiError("");
      const timeout = setTimeout(() => {
        setSuccessMessage("");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  useEffect(() => {
    if (loggedIn) {
      userApi
        .getUserInfo(userId)
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [userId, setCurrentUser, setLoggedIn, loggedIn]);

  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      movies
        .getMoviesCards()
        .then((moviesCards) => {
          setMoviesCards(moviesCards);
        })
        .catch((err) => {
          console.log(err.message);
          setMoviesApiError("Произошла ошибка на стороне сервера Beats-Film.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn, setMoviesCards]);

  useEffect(() => {
    if (loggedIn) {
      userApi
        .getSavedMoviesCards({ owner: userId })
        .then((userMoviesData) => {
          setSavedMoviesCards(userMoviesData.data);
          setSearchedSavedMovies(userMoviesData.data);
        })
        .catch((err) => {
          setUserMoviesApiError(
            "Произошла ошибка на стороне сервера, попробуйте позднее."
          );
          console.log(err.message);
        });
    }
  }, [loggedIn, userId]);

  function handleSaveMovieCard(movieCard) {
    userApi
      .saveMovie(movieCard)
      .then((movieCard) => {
        setSavedMoviesCards([movieCard, ...savedMoviesCards]);
        setSearchedSavedMovies([movieCard, ...searchedSavedMovies]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function handleDeleteMovieCard(movie) {
    userApi
      .deleteMovie(movie)
      .then(() => {
        setSavedMoviesCards((moviesData) =>
          moviesData.filter((card) => card._id !== (movie._id ?? movie))
        );
        setSearchedSavedMovies((moviesData) =>
          moviesData.filter((card) => card._id !== (movie._id ?? movie))
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function searchMovieInList(arr, query) {
    const lowerCaseQuery = query.toLowerCase();
    return arr.filter((item) => {
      const nameRU = item.nameRU.toLowerCase();
      const nameEN = item.nameEN.toLowerCase();
      return nameRU.includes(lowerCaseQuery) || nameEN.includes(lowerCaseQuery);
    });
  }

  function handleSearchMovie(query) {
    setIsSearching(true);
    if (savedMoviesPath) {
      const searchedSavedMovies = searchMovieInList(savedMoviesCards, query);
      setSearchedSavedMovies(searchedSavedMovies);
    } else {
      const searchedMovies = searchMovieInList(moviesCards, query);
      setSearchedMoviesCards(searchedMovies);
    }
  }

  useEffect(() => {
    if (!isSearching) {
      setSearchedSavedMovies(savedMoviesCards);
    }
  }, [isSearching, savedMoviesCards, setSearchedSavedMovies]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                onLogout={handleLogout}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUserInfo}
                connectionError={userApiError}
                successMessage={successMessage}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                onSearch={handleSearchMovie}
                onSave={handleSaveMovieCard}
                onDelete={handleDeleteMovieCard}
                loggedIn={loggedIn}
                isLoading={isLoading}
                movies={searchedMoviesCards}
                savedMovies={savedMoviesCards}
                savedMoviesPath={savedMoviesPath}
                errorMessage={moviesApiError}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                onSearch={handleSearchMovie}
                onSave={handleSaveMovieCard}
                onDelete={handleDeleteMovieCard}
                errorMessage={userMoviesApiError}
                loggedIn={loggedIn}
                isLoading={isLoading}
                movies={searchedSavedMovies}
                savedMovies={savedMoviesCards}
                savedMoviesPath={savedMoviesPath}
                setSearching={setIsSearching}
              />
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Login
                  onLogin={handleLogin}
                  connectionError={userApiError}
                  connectionSuccess={successMessage}
                />
              )
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Register
                  onRegister={handleRegister}
                  loggedIn={loggedIn}
                  connectionError={userApiError}
                />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <InfoToolTip
          isOpen={isStatusPopupOpen}
          onClose={closeAllPopups}
          name="info"
          authMessage={message}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
