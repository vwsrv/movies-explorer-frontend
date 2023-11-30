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
    !isMainPage && <div className="nav">
      {isDefaultResolution ? (
        <nav className="nav__links_theme-dark">
          <div className="movies__links">
            <NavLink to="/movies" className="nav__link nav__link_theme-dark">
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="nav__link nav__link_theme-dark"
            >
              Сохраненные фильмы
            </NavLink>
          </div>
          <NavLink to="/profile" className="nav__link nav__link-profile">
            Аккаунт
            <span className="link__profile-logo" />
          </NavLink>
        </nav>
      ) : (
        <BurgerMenu />
      )}
    </div>
  );
}
