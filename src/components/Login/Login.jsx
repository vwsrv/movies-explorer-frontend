import Auth from "../Auth/Auth";

export default function Login() {
  return (
    <Auth title="Рады видеть!" buttonText="Войти" authText="Ещё не зарегистрированы?" linkText="Регистрация">
      <label htmlFor="user" className="auth__field">
        <span className="auth__input_name">E-mail</span>
        <input type="text" className="auth__input auth__input_type-email" />
        <span className="auth__input-error auth__input-error_type-name"></span>
      </label>
      <label htmlFor="password" className="auth__field">
        <span className="auth__input_name">Пароль</span>
        <input type="text" className="auth__input auth__input_type-password" />
        <span className="auth__input-error auth__input-error_type-name"></span>
      </label>
    </Auth>
  );
}
