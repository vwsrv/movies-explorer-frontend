export default function NavTab() {
  return (
    <section className="navtab">
      <div className="navtab__container">
        <a href="#project" className="navtab__button navtab__buton-about">
          О проекте
        </a>
        <a href="#tech" className="navtab__button navtab__buton-tech">
          Технологии
        </a>
        <a href="#about" className="navtab__button navtab__buton-user">Студент</a>
      </div>
    </section>
  );
}
