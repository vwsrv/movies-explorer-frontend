import { hiddenRoutes, hiddenRoutesFooter } from "../../utils/constants";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    hiddenRoutes.includes(location.pathname) &&
    !hiddenRoutesFooter.includes(location.pathname) && (
      <footer className="footer">
        <p className="footer__project-name">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__container">
          <p className="footer__copyright">© 2020</p>
          <nav className="footer__links">
            <a
              href="https://practicum.yandex.ru/"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a
              href="https://github.com/vwsrv"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </nav>
        </div>
      </footer>
    )
  );
}
