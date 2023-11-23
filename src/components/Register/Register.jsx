import Auth from "../Auth/Auth";

export default function Register() {
  return (
    <Auth title="Добро пожаловать!" buttonText="Регистрация" authText="Уже зарегистрированы?" linkText="Войти">
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
        <input type="text" className="auth__input auth__input_type-password" />
        <span className="auth__input-error auth__input-error_type-name"></span>
      </label>
    </Auth>
  );
}
