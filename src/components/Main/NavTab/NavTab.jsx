import { NavLink } from "react-router-dom";

export default function NavTab() {
  return (
    <div className="navtab">
      <nav className="navtab__navigation">
        <NavLink href="#project" className="navtab__link navtab__link--about">
          О проекте
        </NavLink>
        <NavLink href="#tech" className="navtab__link  navtab__link--tech">
          Технологии
        </NavLink>
        <NavLink href="#about" className="navtab__link navtab__link--user">
          Студент
        </NavLink>
      </nav>
    </div>
  );
}
