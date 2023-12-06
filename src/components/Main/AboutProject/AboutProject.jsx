export default function AboutProject() {
  return (
    <section className="project" id="project">
      <h2 className="project__title">О проекте</h2>
      <ul className="project__description">
        <li className="project__description-item">
          <h3 className="project__brief">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="project__paragraph">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="project__description-item">
          <h3 className="project__brief">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="project__paragraph">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="project__graph">
        <li className="project__graph-item">
          <p className="project__graph-title project__graph-title--color-green">1 неделя</p>
          <p className="project__graph-description">Back-end</p>
        </li>
        <li className="project__graph-item">
          <p className="project__graph-title project__graph-title--color-black">4 недели</p>
          <p className="project__graph-description">Front-end</p>
        </li>
      </ul>
    </section>
  );
}
