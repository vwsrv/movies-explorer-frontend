import { useForm } from "react-hook-form";
import { useState, useEffect, useContext, useCallback } from "react";
import { EMAIL_ANGULAR } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({
  onLogout,
  onUpdateUser,
  connectionError,
  successMessage,
}) {
  const [connectionInfo, setConnectionInfo] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });
  const userName = watch("name");
  const userEmail = watch("email");

  const checkInputValues = useCallback(() => {
    if (userEmail === currentUser.email && userName === currentUser.name) {
      setIsChanged(false);
    }
  }, [userEmail, userName, currentUser.email, currentUser.name]);

  useEffect(() => {
    if (connectionError) {
      setConnectionInfo("");
    }
    setIsChanged(true);
  }, [userName, userEmail, connectionError]);

  useEffect(() => {
    checkInputValues();
  }, [checkInputValues]);

  useEffect(() => {
    if (successMessage) {
      return setConnectionInfo(successMessage);
    } else {
      return setConnectionInfo(connectionError);
    }
  }, [connectionError, successMessage]);

  function onSubmit(data) {
    onUpdateUser(data.email, data.name);
    return setConnectionInfo(connectionError);
  }

  const submitButtonClassName = `profile__button profile__edit-btn ${
    isValid
      ? isChanged
        ? "profile__edit-btn--type_edited"
        : "profile__edit-btn--inactive"
      : connectionError
      ? "profile__edit-btn--type_edited profile__edit-btn--type_edited--inactive"
      : "profile__edit-btn--type_edited profile__edit-btn--type_edited--inactive"
  }`;

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
                message: `Минимальная длина имени: 2 симв.`,
              },
              maxLength: {
                value: 40,
                message: `Максимальная длина имени: 40 симв.`,
              },
            })}
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
                value: EMAIL_ANGULAR,
                message: "Укажите корректный email.",
              },
            })}
            placeholder="Введите E-mail"
          />
        </label>
        <div className="profile__submit-container">
          {errors?.email || errors?.name ? (
            <span className="profile__submit-error">
              {errors?.name?.message || errors?.email.message}
            </span>
          ) : (
            connectionInfo && (
              <span
                className={
                  !successMessage
                    ? "profile__submit-error"
                    : "profile__submit-error profile__submit-success"
                }
              >
                {connectionInfo}
              </span>
            )
          )}
          <button className={submitButtonClassName} type="submit">
            {!isChanged ? `Редактировать` : "Сохранить"}
          </button>
          {!isChanged && isValid && (
            <button
              type="button"
              className="profile__button profile__signout-btn"
              onClick={onLogout}
            >
              Выйти из аккаунта
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
