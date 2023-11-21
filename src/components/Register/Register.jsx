import authLogo from "../../images/main_logo.svg";

export default function Register() {
  return (
    <div className="auth">
      <img src={authLogo} alt="" className="auth__logo" />
      <p className="auth__title">Добро пожаловать!</p>
      <form className="auth__form auth__form_type-register">
        <label htmlFor="user-name" className="auth__field">
          <span className="auth__input_name">Имя</span>
          <input type="text" className="auth__input auth__input_type-name" />
          <span className="auth__input-error auth__input-error_type-name"></span>
        </label>
        <label htmlFor="user" className="auth__field">
          <span className="auth__input_name">E-mail</span>
          <input type="text" className="auth__input auth__input_type-email" />
          <span className="auth__input-error auth__input-error_type-name"></span>
        </label>
        <label htmlFor="password" className="auth__field">
          <span className="auth__input_name">Пароль</span>
          <input
            type="text"
            className="auth__input auth__input_type-password"
          />
          <span className="auth__input-error auth__input-error_type-name"></span>
        </label>
        <button className="auth__submit-btn">Зарегистрироваться</button>
        <div className="auth__signin">
          <p className="auth__text">Уже зарегистрированы?</p>
          <a href="#" className="auth__signin-link">
            Войти
          </a>
        </div>
      </form>
    </div>
  );
}
