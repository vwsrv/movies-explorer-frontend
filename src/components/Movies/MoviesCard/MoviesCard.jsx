import filmExample from '../../../images/example_film.jpg'
export default function MoviesCard () {
    return (
        <article className="film">
            <img src={filmExample} alt="Постер фильма" className="film__image" />
            <div className="film__info">
                <p className="film__title">Little Women</p>
                <button className="film__like-btn"></button>
                <p className="film__duration">1ч 47м</p>
            </div>
        </article>
    )
}