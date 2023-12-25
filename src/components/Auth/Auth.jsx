import authLogo from "../../images/main_logo.svg";
import { useLocation, NavLink } from "react-router-dom";

export default function Auth({
  name,
  title,
  children,
  buttonText,
  authText,
  linkText,
  onSubmit,
  isFormValid,
  connectionError,
}) {
  const location = useLocation();
  const isRegister = location.pathname === "/signup";

  return (
    <main className={`auth auth_form_${name}`}>
      <NavLink to="/">
        <img src={authLogo} alt="Логотип сайта" className="auth__logo" />
      </NavLink>
      <h1 className="auth__title">{title}</h1>
      <form className="auth__form auth__form_type-register" onSubmit={onSubmit}>
        {children}
        <div className={`auth__form-container auth__form-container--${name}`}>
          <span className="auth__submit-error auth__submit-error_inactive">
            {connectionError}
          </span>
          <button
            type="submit"
            className={`auth__submit-btn auth__submit-btn_type-${name} ${
              isFormValid && !connectionError ? "" : "auth__submit-btn_inactive"
            }`}
          >
            {buttonText}
          </button>
        </div>
        <div className="auth__signin">
          <p className="auth__text">{authText}</p>
          <NavLink
            to={isRegister ? "/signin" : "/signup"}
            className="auth__text auth__signin-link"
          >
            {linkText}
          </NavLink>
        </div>
      </form>
    </main>
  );
}
