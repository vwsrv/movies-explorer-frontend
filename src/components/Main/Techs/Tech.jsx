export default function Tech() {
  return (
    <section className="tech" id="tech">
      <div className="tech__container">
        <h2 className="tech__title">Технологии</h2>
        <p className="tech__subtitle">7 технологий</p>
        <p className="tech__brief">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="tech__stack">
          <li className="tech__stack-name">HTML</li>
          <li className="tech__stack-name">CSS</li>
          <li className="tech__stack-name">JS</li>
          <li className="tech__stack-name">React</li>
          <li className="tech__stack-name">Git</li>
          <li className="tech__stack-name">Express.js</li>
          <li className="tech__stack-name">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
