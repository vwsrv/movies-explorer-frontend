import personPhoto from "../../../images/person__photo.jpg";
export default function AboutMe() {
  return (
    <section className="about" id="about">
      <h2 className="about__title">Студент</h2>
      <div className="about__person">
        <h3 className="about__person-name">Lorem Ipsum</h3>
        <p className="about__person-about">Фронтенд-разработчик, ipsum лет</p>
        <p className="about__person-carrer">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
          placeat suscipit corrupti excepturi illum dignissimos expedita iste
          nulla reprehenderit est ea veniam, ad rerum modi quibusdam temporibus
          minus? Reiciendis tempora hic facilis omnis commodi eum quia nobis
          eveniet ipsum? Pariatur sapiente harum, porro molestias architecto
          temporibus laudantium delectus dignissimos consequatur?
        </p>
        <img
          src={personPhoto}
          alt="Фотография разработчика"
          className="about__person-photo"
        />
        <a
          href="https://github.com/vwsrv/"
          className="about__person-website"
          rel="noreferrer"
          target="_blank"
        >
          Github
        </a>
      </div>
    </section>
  );
}
