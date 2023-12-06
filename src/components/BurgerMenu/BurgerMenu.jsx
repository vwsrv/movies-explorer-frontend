import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import useResize from "../../hooks/useResize";
import {
  MOBILE_SCREEN_SZ,
  TABLET_SCREEN_SZ,
} from "../../utils/screenBreakpoints";

export default function BurgerMenu() {
  const [isActiveBurger, setIsActiveBurger] = useState(false);
  const { width } = useResize();
  const isTablet = TABLET_SCREEN_SZ >= width;
  const isMobile = MOBILE_SCREEN_SZ >= width;
  const [showMenu, setShowMenu] = useState(false);
  const menuProperties = useSpring({
    left: showMenu ? 0 : 800,
    from: { left: showMenu ? 0 : 800 },
  });

  function toggleBurgerManu() {
    setShowMenu(!showMenu);
    setIsActiveBurger(!isActiveBurger);
  }

  return (
    isTablet && (
      <div className="burgermenu">
        <animated.div
          style={menuProperties}
          className={isActiveBurger ? "menu menu__opened" : "menu"}
          id="menu"
        >
          <nav
            className={
              isMobile ? "menu__links menu__links_type-mobile" : "menu__links"
            }
          >
            <NavLink to="/" className="menu__link" onClick={toggleBurgerManu}>
              Главная
            </NavLink>
            <NavLink
              to="/movies"
              className="menu__link"
              onClick={toggleBurgerManu}
            >
              Фильмы
            </NavLink>
            <NavLink
              to="/saved-movies"
              className="menu__link"
              onClick={toggleBurgerManu}
            >
              Сохраненные фильмы
            </NavLink>
            <NavLink
              to="/profile"
              className="menu__link menu__link-profile"
              onClick={toggleBurgerManu}
            >
              Аккаунт
              <span className="menu__link-profile--image" />
            </NavLink>
          </nav>
        </animated.div>
        <button
          type="button"
          className={
            isActiveBurger ? "burgermenu-btn burgermenu-btn_active" : "burgermenu-btn"
          }
          onClick={toggleBurgerManu}
        >
          <span className="burgermenu-btn--span"></span>
          <span className="burgermenu-btn--span"></span>
          <span className="burgermenu-btn--span"></span>
        </button>
      </div>
    )
  );
}
