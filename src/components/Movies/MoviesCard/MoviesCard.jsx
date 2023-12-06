import { useState } from "react";
import { useLocation } from "react-router-dom";
import filmExample from "../../../images/example_film.jpg";
export default function MoviesCard() {
  const [isLiked, setIsLiked] = useState(false);
  const filmSaveButtonClassName = `film__like-btn ${
    (isLiked && `film__like-btn_active`)
  }`;
  const location = useLocation();
  const isSaved = location.pathname === "/saved-movies";
  
  function toggleSave() {
    setIsLiked(!isLiked);
  }

  return (
    <article className="film">
      <img src={filmExample} alt="Постер фильма" className="film__image"/>
      <div className="film__info">
        <h2 className="film__title">Little Women</h2>
        <button
          type="button"
          className={isSaved ? 'film__delete-btn' : filmSaveButtonClassName }
          onClick={toggleSave}
        ></button>
        <p className="film__duration">1ч 47м</p>
      </div>
    </article>
  );
}
