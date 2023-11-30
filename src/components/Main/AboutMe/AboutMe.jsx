import personPhoto from "../../../images/person__photo.jpg";
export default function AboutMe() {
  return (
    <section className="about" id="about">
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
        <img
          src={personPhoto}
          alt="Фотография разработчика"
          className="person__photo"
        />
        <a href="https://github.com/vwsrv/" className="person__website">
          Github
        </a>
      </div>
    </section>
  );
}
