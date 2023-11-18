import linkImage from "../../../images/main__arrow.svg";
import personPhoto from "../../../images/person__photo.jpg"
export default function AboutMe() {
  return (
    <section className="about">
      <h2 className="section__title">Студент</h2>
      <div className="about__person">
          <p className="person__name">Lorem Ipsum</p>
          <p className="person__about">Фронтенд-разработчик, ipsum лет</p>
          <p className="person__carrer">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
            placeat suscipit corrupti excepturi illum dignissimos expedita iste
            nulla reprehenderit est ea veniam, ad rerum modi quibusdam temporibus
            minus? Reiciendis tempora hic facilis omnis commodi eum quia nobis
            eveniet ipsum? Pariatur sapiente harum, porro molestias architecto
            temporibus laudantium delectus dignissimos consequatur?
          </p>
          <img src={personPhoto} alt="Фотография разработчика" className="person__photo" />
          <a href="#" className="person__website">
            Github
          </a>
      </div>
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
    </section>
  );
}
