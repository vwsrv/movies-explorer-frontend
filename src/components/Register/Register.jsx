import Auth from "../Auth/Auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { emailAngular, passwordPattern } from "../../utils/constants";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });
  return (
    <Auth
      name='register'
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      authText="Уже зарегистрированы?"
      linkText="Войти"
      isValid={isValid}
    >
      <label htmlFor="user-name" className="auth__field">
        <span className="auth__input-name">Имя</span>
        <input
          id="name-input"
          type="text"
          className="auth__input auth__input_type-name"
          placeholder="Имя"
          {...register("name", {
            required: "Заполните это поле.",
            minLength: {
              value: 2,
              message: `Минимальная длина имени: 2. Вы ввели: ${userName.length}.`,
            },
            maxLength: {
              value: 40,
              message: `Максимальная длина имени: 40. Вы ввели: ${userName.length}.`,
            },
          })}
          onChange={(e) => setUserName(e.target.value)}
        />
        {errors?.name && (
          <span className="auth__input-error auth__input-error_type-name">
            {errors?.name?.message}
          </span>
        )}
      </label>
      <label htmlFor="user" className="auth__field">
        <span className="auth__input-name">E-mail</span>
        <input
          id="email-input"
          type="text"
          className="auth__input auth__input_type-email"
          placeholder="E-mail"
          {...register("email", {
            required: "Заполните это поле.",
            pattern: {
              value: emailAngular,
              message: "Укажите корректный email.",
            },
          })}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        {errors?.email && (
          <span className="auth__input-error auth__input-error_type-name">
            {errors?.email?.message}
          </span>
        )}
      </label>
      <label htmlFor="password" className="auth__field">
        <span className="auth__input-name">Пароль</span>
        <input
          id="password-input"
          type="password"
          className="auth__input auth__input_type-password"
          placeholder="Пароль"
          {...register("password", {
            required: "Заполните это поле",
            minLength: {
              value: 8,
              message: `Минимальная длина пароля: 8. Вы ввели: ${userPassword.length}.`,
            },
            pattern: {
              value: passwordPattern,
              message:
                "Пароль должен содержать как минимум 1 строчную и 1 заглавную букву, 1 цифру и символы @$!%*?&",
            },
          })}
          onChange={(e) => setUserPassword(e.target.value)}
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