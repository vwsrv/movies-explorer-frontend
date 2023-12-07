import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ movieCard }) {
  return (
    <section className="movies-cards">
      {movieCard.map((card) => (
        <MoviesCard
          key={card.id}
          movieName={card.nameRU}
          movieLink={card.image.url}
          movieDuration={card.duration}
          trailerLink={card.trailerLink}
        />
      ))}
    </section>
  );
}
