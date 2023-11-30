import headerLogo from "../../images/main_logo.svg";
import Navigation from "../Navigation/Navigation";
import { useLocation, NavLink } from "react-router-dom";
import { hiddenRoutes } from "../../utils/constants";

export default function Header({ loggedIn }) {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    hiddenRoutes.includes(location.pathname) && (
      <header
        className={
          isMainPage
            ? "header header__theme_default"
            : "header header__theme_dark"
        }
      >
        <div className="header__container">
          <NavLink to="/">
            <img
              src={headerLogo}
              alt="Логотип сайта"
              className="header__logo"
            ></img>
          </NavLink>
          {!loggedIn ? (
            <div className="header__links">
              <NavLink
                to="/signup"
                className="header__link header__link_type-signup"
              >
                Регистрация
              </NavLink>
              <NavLink
                to="/signin"
                className="header__link header__link_type-signin"
              >
                Войти
              </NavLink>
            </div>
          ) : (
            <Navigation />
          )}
        </div>
      </header>
    )
  );
}
