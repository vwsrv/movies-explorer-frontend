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
    <div className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <label htmlFor="user-name" className="profile__field">
          <p className="profile__input_name">Имя</p>
          <input
            type="text"
            className="profile__input profile__input_type-name"
            {...register("name", {
              required: "Заполните все поля.",
            })}
            value={userName || ""}
            onChange={(e) => setUserName(e.target.value)}
            autoComplete="off"
            id="name-input"
            placeholder="Введите имя"
          />
        </label>
        <label htmlFor="user-email" className="profile__field">
          <p className="profile__input_name">E-mail</p>
          <input
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
            id="email-input"
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
          href="#"
          className="profile__button profile__signout-btn"
          onClick={onLogout}
        >
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}
