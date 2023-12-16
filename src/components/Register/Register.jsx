import Auth from "../Auth/Auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { emailAngular } from "../../utils/constants";
import { useEffect } from "react";

export default function Register({ onRegister, connectionError }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    setError(connectionError);
  }, [connectionError]);

  function onSubmit() {
    onRegister(userEmail, userPassword, userName);
    if (connectionError) {
      return setError(connectionError);
    } else {
      setError("");
    }
  }

  function handleInputChange(e) {
    if (e.target.name === "email") {
      setUserEmail(e.target.value);
    } else if (e.target.name === "password") {
      setUserPassword(e.target.value);
    } else if (e.target.name === "name") {
      setUserName(e.target.value);
    }
    setError("");
  }

  return (
    <Auth
      name="register"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      authText="Уже зарегистрированы?"
      linkText="Войти"
      isValid={isValid}
      onSubmit={handleSubmit(onSubmit)}
      connectionError={error}
    >
      <label htmlFor="user-name" className="auth__field">
        <span className="auth__input-name">Имя</span>
        <input
          id="user-name"
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
          onChange={handleInputChange}
          value={userName}
        />
        {errors?.name && (
          <span className="auth__input-error auth__input-error_type-name">
            {errors?.name?.message}
          </span>
        )}
      </label>
      <label htmlFor="email-input" className="auth__field">
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
          value={userEmail}
          onChange={handleInputChange}
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
          })}
          value={userPassword}
          onChange={handleInputChange}
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
