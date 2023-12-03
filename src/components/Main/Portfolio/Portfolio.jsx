import linkImage from "../../../images/main__arrow.svg";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <div className="project__item">
        <a
          href="https://github.com/vwsrv/how-to-learn"
          className="project__link"
          rel="noreferrer"
          target="_blank"
        >
          <p className="project__name">Статичный сайт</p>
          <img
            src={linkImage}
            alt="Стрелка для перехода на сайт проекта"
            className="link__image"
          />
        </a>
      </div>
      <div className="project__item">
        <a
          href="https://github.com/vwsrv/russian-travel"
          rel="noreferrer"
          target="_blank"
          className="project__link"
        >
          <p className="project__name">Адаптивный сайт</p>
          <img
            src={linkImage}
            alt="Стрелка для перехода на сайт проекта"
            className="link__image"
          />
        </a>
      </div>
      <div className="project__item">
        <a
          href="https://github.com/vwsrv/mesto-project-full"
          className="project__link"
          rel="noreferrer"
          target="_blank"
        >
          <p className="project__name">Одностраничное приложение</p>
          <img
            src={linkImage}
            alt="Стрелка для перехода на сайт проекта"
            className="link__image"
          />
        </a>
      </div>
    </section>
  );
}
