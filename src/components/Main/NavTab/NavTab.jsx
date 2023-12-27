export default function NavTab() {
  return (
    <div className="navtab">
      <ul className="navtab__navigation">
        <li className="navtab__link">
          <a href="#project" className="navtab__link--item">
            О проекте
          </a>
        </li>
        <li className="navtab__link">
          <a href="#tech" className="navtab__link--item">
            Технологии
          </a>
        </li>
        <li className="navtab__link">
          <a href="#about" className="navtab__link--item">
            Студент
          </a>
        </li>
      </ul>
    </div>
  );
}
