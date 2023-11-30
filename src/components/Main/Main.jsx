import Promo from "./Promo/Promo.jsx";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import AboutMe from "./AboutMe/AboutMe";
import Tech from "./Techs/Tech";
import Portfolio from "./Portfolio/Portfolio.jsx";

export default function Main() {
  return (
    <section className="section__main">
      <Promo />
      <NavTab />
      <AboutProject />
      <Tech />
      <AboutMe />
      <Portfolio />
    </section>
  );
}
