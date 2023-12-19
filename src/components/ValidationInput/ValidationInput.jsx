import { useFormContext } from "react-hook-form";

export default function ValidationInput({ name, rules, inputName, inputType, ...rest }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={`${name}-input`} className="auth__field">
        <span className="auth__input-name">{inputName}</span>
        <input
          type={inputType}
          className={`auth__input auth__input_type-${name}`}
          placeholder={inputName}
          id={`${name}-input`}
          {...register(name, rules)}
          {...rest}
        />
        {errors[name] && (
          <span className={`auth__input-error auth__input-error_type-${name}`}>
            {errors[name].message}
          </span>
        )}
      </label>
    </>
  );
}
