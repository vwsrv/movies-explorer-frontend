import authLogo from "../../images/main_logo.svg";
import { useLocation, NavLink } from "react-router-dom";

export default function Auth({title, children, buttonText, authText, linkText}) {
    const location = useLocation();
    const isRegister = location.pathname === '/signup';

    return (
      <div className="auth">
        <img src={authLogo} alt="" className="auth__logo" />
        <h2 className="auth__title">{title}</h2>
        <form className="auth__form auth__form_type-register">
          {children}
          <button className="auth__submit-btn">{buttonText}</button>
          <div className="auth__signin">
            <p className="auth__text">{authText}</p>
            <NavLink to={isRegister ? '/signin' : '/signup'} className="auth__signin-link">
              {linkText}
            </NavLink>
          </div>
        </form>
      </div>
    );
  }