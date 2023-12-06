import Promo from "./Promo/Promo.jsx";
import NavTab from "./NavTab/NavTab.jsx";
import AboutProject from "./AboutProject/AboutProject.jsx";
import AboutMe from "./AboutMe/AboutMe.jsx";
import Tech from "./Techs/Tech.jsx";
import Portfolio from "./Portfolio/Portfolio.jsx";

export default function Main() {
  return (
    <main className="main">
      <Promo />
      <NavTab />
      <AboutProject />
      <Tech />
      <AboutMe />
      <Portfolio />
    </main>
  );
}
