import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { useState } from "react";

export default function App() {
  const navigate = useNavigate();
  const [loggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
    navigate("/", { replace: true });
  }

  function handleLogout() {
    setIsLoggedIn(false);
    navigate("/", {replace: true})
  }

  return (
    <body className="page">
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<Main />} />
        <Route path="movies" element={<Movies />} />
        <Route path="saved-movies" element={<SavedMovies />} />
        <Route path="profile" element={<Profile onLogout={handleLogout}/>} />
        <Route path="signin" element={<Login onLogin={handleLogin} />} />
        <Route path="signup" element={<Register />} />
      </Routes>
      <Footer />
    </body>
  );
}
