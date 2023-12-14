import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { emailAngular } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

export default function Profile({ onLogout, onUpdateUser, loggedIn }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  function onSubmit() {
    onUpdateUser(userEmail, userName)
  }

  useEffect(() => {
    setUserEmail(currentUser.email);
    setUserName(currentUser.name);
    reset();
  }, [currentUser])

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}</h1>
      <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
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
            value={userEmail || ""}
            placeholder="Введите E-mail"
          />
        </label>
        {(errors?.name || errors?.email) && (
          <span className="profile__input-error">
            {errors?.name?.message || errors?.email.message}
          </span>
        )}
        <button className={isValid ? "profile__button profile__edit-btn" : "profile__button profile__edit-btn_inactive"} type="submit">
          Редактировать
        </button>
        <button
          type="button"
          className="profile__button profile__signout-btn"
          onClick={onLogout}
          disabled='true'
        >
          Выйти из аккаунта
        </button>
      </form>
    </main>
  );
}
