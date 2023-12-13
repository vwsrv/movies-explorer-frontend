import { useState } from "react";
import Auth from "../Auth/Auth";
import { useForm } from "react-hook-form";
import { emailAngular } from "../../utils/constants";

export default function Login({ onLogin }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  function onSubmit() {
    onLogin(userEmail, userPassword);
  }

  return (
    <Auth
      name="signin"
      title="Рады видеть!"
      buttonText="Войти"
      authText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
    >
      <label htmlFor="email-input" className="auth__field">
        <span className="auth__input-name">E-mail</span>
        <input
          type="text"
          className="auth__input auth__input_type-email"
          placeholder="E-mail"
          id="email-input"
          {...register("email", {
            required: "Заполните это поле.",
            pattern: {
              value: emailAngular,
              message: "Укажите корректный email.",
            },
          })}
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
        />
        {errors?.email && (
          <span className="auth__input-error auth__input-error_type-name">
            {errors?.email?.message}
          </span>
        )}
      </label>
      <label htmlFor="password-input" className="auth__field">
        <span className="auth__input-name">Пароль</span>
        <input
          type="password"
          id="password-input"
          className="auth__input auth__input_type-password"
          placeholder="Пароль"
          {...register("password", {
            required: "Заполните это поле.",
            minLength: {
              value: 8,
              message: `Минимальная длина пароля: 8. Вы ввели: ${userPassword.length}.`,
            },
          })}
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
          autoComplete="on"
        />
        {errors?.password && (
          <span className="auth__input-error auth__input-error_type-name">
            {errors?.password?.message}
          </span>
        )}
      </label>
    </Auth>
  );
}
