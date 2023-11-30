import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { emailAngular } from "../../utils/constants";

export default function Profile() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  return (
    <div className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
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
          />
        </label>
        {(errors?.name || errors?.email) && (
          <span className="profile__input-error">
            {errors?.name?.message || errors?.email.message}
          </span>
        )}
        <button className="profile__button profile__edit-btn">
          Редактировать
        </button>
        <button href="#" className="profile__button profile__signout-btn">
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}
