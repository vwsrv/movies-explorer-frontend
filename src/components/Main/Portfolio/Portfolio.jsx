import linkImage from "../../../images/main__arrow.svg";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__item">
        <a
          href="https://vwsrv.github.io/how-to-learn/"
          className="portfolio__link"
          rel="noreferrer"
          target="_blank"
        >
          <p className="portfolio__name">Статичный сайт</p>
          <img
            src={linkImage}
            alt="Стрелка для перехода на сайт проекта"
            className="portfolio__image"
          />
        </a>
      </div>
      <div className="portfolio__item">
        <a
          href="https://vwsrv.github.io/russian-travel/"
          rel="noreferrer"
          target="_blank"
          className="portfolio__link"
        >
          <p className="portfolio__name">Адаптивный сайт</p>
          <img
            src={linkImage}
            alt="Стрелка для перехода на сайт проекта"
            className="portfolio__image"
          />
        </a>
      </div>
      <div className="portfolio__item">
        <a
          href="https://vwsrv.github.io/react-mesto-auth"
          className="portfolio__link"
          rel="noreferrer"
          target="_blank"
        >
          <p className="portfolio__name">Одностраничное приложение</p>
          <img
            src={linkImage}
            alt="Стрелка для перехода на сайт проекта"
            className="portfolio__image"
          />
        </a>
      </div>
    </section>
  );
}
