export default function AboutProject () {
    return(
        <section className="project">
            <h2 className="section__title">О проекте</h2>
            <ul className="project__description">
                <li className="description__item">
                    <h3 className="description__brief">Дипломный проект включал 5 этапов</h3>
                    <p className="description__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="description__item">
                    <h3 className="description__brief">На выполнение диплома ушло 5 недель</h3>
                    <p className="description__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <ul className="project__graph">
                <li className="graph__item">
                    <p className="graph__title graph__title_color-green">1 неделя</p>
                    <p className="graph__description">Back-end</p>
                </li>
                <li className="graph__item">
                    <p className="graph__title graph__title_color-black">4 недели</p>
                    <p className="graph__description">Front-end</p>
                </li>  
            </ul>
        </section>
    )
}