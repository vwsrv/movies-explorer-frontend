import { NavLink, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
      <div className={isMainPage ? "nav" : "nav__theme-dark"}>
      <div className="nav__links">
        <nav className={isMainPage ? "nav__links nav__links_type-auth" : "nav__links_type-auth_inactive"}>
          <NavLink to='/signup' className='nav__link nav__link_type-signup'>Регистрация</NavLink> 
          <NavLink to='/signin' className='nav__link nav__link_type-signin'>Войти</NavLink>
        </nav>
        <nav className={isMainPage ? "nav__links nav__links_theme-dark_inactive" : "nav__links_theme-dark"}>
          <div className="movies__links">
            <NavLink to='/movies' className='nav__link nav__link_theme-dark'>Фильмы</NavLink> 
            <NavLink to='/saved-movies' className='nav__link nav__link_theme-dark'>Сохраненные фильмы</NavLink>
          </div>
          <NavLink to='/profile' className="nav__link nav__link-profile">Аккаунт
            <span className="link__profile-logo" />
          </NavLink>
        </nav>
      </div>
    </div>
    );
}
