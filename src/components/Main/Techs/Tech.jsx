export default function Tech() {
    return(
        <section className="tech">
            <div className="tech__container">
                <h2 className="section__title">Технологии</h2>
                <p className="tech__subtitle">7 технологий</p>
                <p className="tech_brief">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="tech__stack">
                    <li className="stack__name">HTML</li>
                    <li className="stack__name">CSS</li>
                    <li className="stack__name">JS</li>
                    <li className="stack__name">Git</li>
                    <li className="stack__name">Express.js</li>
                    <li className="stack__name">mongoDB</li>
                </ul>
            </div>
        </section>
    )
}