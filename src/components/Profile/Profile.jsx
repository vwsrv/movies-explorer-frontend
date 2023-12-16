import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { emailAngular } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({ onLogout, onUpdateUser, connectionError }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [serverError, setserverError] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    setserverError(connectionError);
  }, [connectionError]);

  useEffect(() => {
    setUserEmail(currentUser.email);
    setUserName(currentUser.name);
    clearErrors();
  }, [currentUser, clearErrors]);

  useEffect(() => {
    checkInputValues()
  }, [checkInputValues])

  function onSubmit() {
    onUpdateUser(userEmail, userName);
    if (connectionError) {
      return setserverError(connectionError);
    } else {
      setserverError("");
    }
  }

  function checkInputValues() {
    if ((userEmail === currentUser.email) && (userName === currentUser.name)) {
      setIsChanged(false);
    }
  }

  function handleInputChange(e) {
    if (e.target.name === "email") {
      setIsChanged(true);
      setUserEmail(e.target.value);
    } else if (e.target.name === "name") {
      setIsChanged(true);
      setUserName(e.target.value);
    }
    setserverError("");
  }

  const submitButtonClassName = isValid && !serverError
    ? isChanged
      ? "profile__edit-btn profile__edit-btn--type_edited"
      : "profile__button profile__edit-btn_inactive"
    : "profile__button profile__edit-btn--type_edited profile__edit-btn--type_edited--inactive";

  return (
    <main className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}</h1>
      <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="user-name" className="profile__field">
          <span className="profile__input-name">Имя</span>
          <input
            id="user-name"
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
            onChange={handleInputChange}
            placeholder="Введите имя"
          />
        </label>
        <label htmlFor="user-email" className="profile__field">
          <span className="profile__input-name">E-mail</span>
          <input
            id="user-email"
            type="text"
            className="profile__input profile__input_type-email"
            {...register("email", {
              required: "Заполните все поля.",
              pattern: {
                value: emailAngular,
                message: "Укажите корректный email.",
              },
            })}
            onChange={handleInputChange}
            value={userEmail}
            placeholder="Введите E-mail"
          />
        </label>
        {errors?.email || errors?.name ? (
          <span className="profile__input-error">
            {errors?.name?.message || errors?.email.message}
          </span>
        ) : (
          serverError && <span className="profile__input-error">{serverError}</span>
        )}
        <button className={submitButtonClassName} type="submit">
          {!isChanged ? `Редактировать` : "Сохранить"}
        </button>
        {!isChanged && (
          <button
            type="button"
            className="profile__button profile__signout-btn"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        )}
      </form>
    </main>
  );
}
