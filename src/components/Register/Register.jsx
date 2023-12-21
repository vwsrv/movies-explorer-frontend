import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { emailAngular } from "../../utils/constants";
import { useEffect } from "react";
import Auth from "../Auth/Auth";
import ValidationInput from "../ValidationInput/ValidationInput";

export default function Register({
  onRegister,
  connectionError,
  successMessage,
}) {
  const [connectionInfo, setConnectionInfo] = useState("");

  const { ...methods } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const userName = methods.watch("name");
  const userEmail = methods.watch("email");
  const userPassword = methods.watch("password");

  useEffect(() => {
    if (userName || userEmail || userPassword) {
      setConnectionInfo("");
    }
  }, [userName, userEmail, userPassword]);

  function onSubmit(data) {
    if (successMessage) {
      setConnectionInfo(successMessage);
    }
    onRegister(data.email, data.password, data.name);
    setConnectionInfo(connectionError);
  }

  return (
    <FormProvider {...methods}>
      <Auth
        name="register"
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        authText="Уже зарегистрированы?"
        linkText="Войти"
        isFormValid={methods.formState.isValid}
        onSubmit={methods.handleSubmit(onSubmit)}
        connectionError={connectionInfo}
      >
        <ValidationInput
          inputName="Имя"
          inputType="text"
          name="name"
          rules={{
            required: "Заполните это поле.",
            minLength: {
              value: 2,
              message: `Минимальная длина имени: 2 симв.`,
            },
            maxLength: {
              value: 40,
              message: `Максимальная длина имени: 40 симв.`,
            },
          }}
        />
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
          inputName="Пароль"
          inputType="password"
          name="password"
          autoComplete="true"
          rules={{
            required: "Заполните это поле",
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
