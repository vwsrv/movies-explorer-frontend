export default function NavTab() {
  return (
    <section className="navtab">
      <nav className="navtab__navigation">
        <a href="#project" className="navtab__link navtab__link--about">
          О проекте
        </a>
        <a href="#tech" className="navtab__link  navtab__link--tech">
          Технологии
        </a>
        <a href="#about" className="navtab__link navtab__link--user">
          Студент
        </a>
      </nav>
    </section>
  );
}
