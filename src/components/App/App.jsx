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

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useStorage("isLoggedIn", false);
  const [currentUser, setCurrentUser] = useStorage("currentUser", {});
  const [moviesCards, setMoviesCards] = useState([]);
  const [searchedMoviesCards, setSearchedMoviesCards] = useStorage("movies-cards", []);
  const [savedMoviesCards, setSavedMoviesCards] = useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [isMoviesFiltered, setMoviesFiltered] = useStorage(
    "movies-checked",
    false
  );
  const [isSavedMoviesFiltered, setSavedMoviesFiltered] = useStorage(
    "saved-movies-checked",
    false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const savedMoviesPath = location.pathname === "/saved-movies";

  function handleRegister(email, password, name) {
    userApi
      .register(email, password, name)
      .then(() => {
          handleLogin(email, password);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    userApi
      .login(email, password)
      .then((res) => {
        token.setToken(res._id);
        setLoggedIn(true);
        setSuccessMessage("Добро пожаловать!");
        navigate("/movies", { replace: true });
        localStorage.setItem("isLoggedIn", true);
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage(err.message);
      });
  }

  function handleLogout() {
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
        setErrorMessage("");
        setSuccessMessage("Данные успешно обновлены!");
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMessage(err.message);
      });
  }

  useEffect(() => {
    if (successMessage) {
      setErrorMessage("");
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
          setErrorMessage("Произошла ошибка на стороне сервера Beats-Film.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loggedIn, setMoviesCards]);

  useEffect(() => {
    if (loggedIn) {
      userApi
        .getSavedMoviesCards({owner: userId})
        .then((userMoviesData) => {
          setSavedMoviesCards(userMoviesData.data);
          setSearchedSavedMovies(userMoviesData.data)
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [loggedIn, userId]);

  function handleSaveMovieCard(movieCard) {
    userApi
      .saveMovie(movieCard)
      .then((movieCard) => {
        setSavedMoviesCards([movieCard, ...savedMoviesCards]);
        setSearchedSavedMovies([movieCard, ...searchedSavedMovies])
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
          moviesData.filter((card) => card._id !== (movie._id || movie))
        );
        setSearchedSavedMovies((moviesData) =>
          moviesData.filter((card) => card._id !== (movie._id || movie))
        );
      })
      .catch((err) => {
        console.log(`${err.message}.`);
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
    if (savedMoviesPath) {
      const searchedSavedMovies = searchMovieInList(savedMoviesCards, query);
      setSearchedSavedMovies(searchedSavedMovies);
    } else {
      const searchedMovies = searchMovieInList(moviesCards, query);
      setSearchedMoviesCards(searchedMovies);
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Main />} />
          <Route
            path="profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                onLogout={handleLogout}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUserInfo}
                connectionError={errorMessage}
                successMessage={successMessage}
              />
            }
          />
          <Route
            path="movies"
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
                isFiltered={isMoviesFiltered}
                setFiltered={setMoviesFiltered}
                savedMoviesPath={savedMoviesPath}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path="saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                onSearch={handleSearchMovie}
                onSave={handleSaveMovieCard}
                onDelete={handleDeleteMovieCard}
                loggedIn={loggedIn}
                isLoading={isLoading}
                movies={searchedSavedMovies}
                savedMovies={savedMoviesCards}
                savedMoviesPath={savedMoviesPath}
                isFiltered={isSavedMoviesFiltered}
                setFiltered={setSavedMoviesFiltered}
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
              loggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Register
                  onRegister={handleRegister}
                  loggedIn={loggedIn}
                  connectionError={errorMessage}
                  successMessage={successMessage}
                />
              )
            }
          />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}
