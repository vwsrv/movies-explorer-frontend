import succesLogo from "../../images/main_logo.svg";
import errorLogo from "../../images/message_error.svg";
import { useSpring, animated } from "react-spring";
import { useEffect } from "react";

export default function InfoToolTip({ name, isOpen, onClose, authMessage }) {
  const menuProperties = useSpring({
    transform: `translateX(${isOpen ? 0 : 100}%)`, // Используйте проценты для правильного выезда справа
    from: { transform: `translateX(${isOpen ? 100 : 0}%)` },
  });

  useEffect(() => {
    if (isOpen) {
      const timerId = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timerId);
    }
  }, [isOpen, onClose]);

  return (
    <div className={`popup popup_form_${name} ${isOpen && "popup_opened"}`}>
      <animated.div
        style={menuProperties}
        className={`popup__container popup__container-${name}`}
      >
        <img
          src={authMessage.status ? succesLogo : errorLogo}
          alt="Статус авторизации"
          className="popup__image"
        />
        <h2 className={`popup__title popup__title_${name}`}>
          {authMessage.text}
        </h2>
      </animated.div>
    </div>
  );
}
