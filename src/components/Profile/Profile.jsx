import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { emailAngular } from "../../utils/constants";

export default function Profile({ onLogout }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <label htmlFor="user-name" className="profile__field">
          <span className="profile__input-name">Имя</span>
          <input
            id='user-name'
            type="text"
            className="profile__input profile__input_type-name"
            {...register("name", {
              required: "Заполните все поля.",
              minLength: {
                value: 2,
                message: `Минимальная длина имени: 2. Вы ввели: ${userName.length}.`,
              },
              maxLength: {
                value: 40,
                message: `Максимальная длина имени: 40. Вы ввели: ${userName.length}.`,
              },
            })}
            value={userName || ""}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="off"
            placeholder="Введите имя"
          />
        </label>
        <label htmlFor="user-email" className="profile__field">
          <span className="profile__input-name">E-mail</span>
          <input
            id='user-email'
            type="text"
            className="profile__input profile__input_type-email"
            {...register("email", {
              required: "Заполните все поля.",
              pattern: {
                value: emailAngular,
                message: "Укажите корректный email.",
              },
            })}
            onChange={(e) => setUserEmail(e.target.value)}
            autoComplete="off"
            value={userEmail || ""}
            placeholder="Введите E-mail"
          />
        </label>
        {(errors?.name || errors?.email) && (
          <span className="profile__input-error">
            {errors?.name?.message || errors?.email.message}
          </span>
        )}
        <button className="profile__button profile__edit-btn" type="button">
          Редактировать
        </button>
        <button
          type="button"
          className="profile__button profile__signout-btn"
          onClick={onLogout}
        >
          Выйти из аккаунта
        </button>
      </form>
    </main>
  );
}
