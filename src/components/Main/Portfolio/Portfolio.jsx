import linkImage from "../../../images/main__arrow.svg";

export default function Portfolio() {
    return (
        <ul className="portfolio">
        <p className="portfolio__title">Портфолио</p>
        <li className="project__item">
          <a href="#" className="project__link">
            <p className="project__name">Статичный сайт</p>
            <img
              src={linkImage}
              alt="Стрелка для перехода на сайт проекта"
              className="link__image"
            />
          </a>
        </li>
        <li className="project__item">
          <a href="#" className="project__link">
            <p className="project__name">Адаптивный сайт</p>
            <img
              src={linkImage}
              alt="Стрелка для перехода на сайт проекта"
              className="link__image"
            />
          </a>
        </li>
        <li className="project__item">
          <a href="#" className="project__link">
            <p className="project__name">Одностраничное приложение</p>
            <img
              src={linkImage}
              alt="Стрелка для перехода на сайт проекта"
              className="link__image"
            />
          </a>
        </li>
      </ul>
    )
}