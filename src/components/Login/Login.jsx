import { useState, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { emailAngular } from "../../utils/constants";
import { useEffect } from "react";
import Auth from "../Auth/Auth";
import ValidationInput from "../ValidationInput/ValidationInput";

export default function Login({ onLogin, connectionError, successMessage }) {
  const [connectionInfo, setConnectionInfo] = useState("");
  const { ...methods } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
    },
  });
  const userEmail = methods.watch("email");
  const userPassword = methods.watch("password");

  useEffect(() => {
    setConnectionInfo(connectionError);
  }, [connectionError]);

  useEffect(() => {
    if (userEmail || userPassword) {
      setConnectionInfo("");
    }
  }, [userEmail, userPassword]);

  function onSubmit(data) {
    if (successMessage) {
      setConnectionInfo(successMessage);
    }
    onLogin(data.email, data.password);
    setConnectionInfo(connectionError);
  }

  return (
    <FormProvider {...methods}>
      <Auth
        name="signin"
        title="Рады видеть!"
        buttonText="Войти"
        authText="Ещё не зарегистрированы?"
        linkText="Регистрация"
        onSubmit={methods.handleSubmit(onSubmit)}
        connectionError={connectionInfo}
        isFormValid={methods.formState.isValid}
      >
        <ValidationInput
          inputName="E-mail"
          inputType="text"
          name="email"
          rules={{
            required: "Заполните это поле.",
            pattern: {
              value: emailAngular,
              message: "Укажите корректный email.",
            },
          }}
        />
        <ValidationInput
          name="password"
          inputType="password"
          inputName="Пароль"
          autoComplete="true"
          rules={{
            required: "Заполните это поле.",
            minLength: {
              value: 8,
              message: `Минимальная длина пароля: 8 симв.`,
            },
          }}
        />
      </Auth>
    </FormProvider>
  );
}
