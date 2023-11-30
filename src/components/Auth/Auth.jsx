import authLogo from "../../images/main_logo.svg";
import { useLocation, NavLink } from "react-router-dom";

export default function Auth({
  title,
  children,
  buttonText,
  authText,
  linkText,
  onSubmit,
  isValid,
}) {
  const location = useLocation();
  const isRegister = location.pathname === "/signup";

  return (
    <div className="auth">
      <img src={authLogo} alt="" className="auth__logo" />
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form auth__form_type-register" onSubmit={onSubmit}>
        {children}
        <button
          type="submit"
          className={
            isValid
              ? "auth__submit-btn"
              : "auth__submit-btn auth__submit-btn_inactive"
          }
        >
          {buttonText}
        </button>
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
    </div>
  );
}
