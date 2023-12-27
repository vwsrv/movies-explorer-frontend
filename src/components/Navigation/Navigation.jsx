import { NavLink, useLocation } from "react-router-dom";
import useResize from "../../hooks/useResize";
import { TABLET_SCREEN_SZ } from "../../utils/screenBreakpoints";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function Navigation() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const { width } = useResize();
  const isDefaultResolution = TABLET_SCREEN_SZ <= width;

  return (
    <div className={!isMainPage ? "nav" : "nav nav_theme_default"}>
      {isDefaultResolution ? (
        <nav className="nav__links">
          <div className="nav__links--movies">
            <NavLink to="/movies" className="nav__link">
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="nav__link">
              Сохраненные фильмы
            </NavLink>
          </div>
          <NavLink to="/profile" className="nav__link nav__link-profile">
            Аккаунт
            <span className="nav__link-profile--image" />
          </NavLink>
        </nav>
      ) : (
        <BurgerMenu />
      )}
    </div>
  );
}
