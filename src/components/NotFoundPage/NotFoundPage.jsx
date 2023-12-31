import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1, { replace: true });
  }

  return (
    <main className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__subtitle">Страница не найдена</p>
      <button type="button" className="notfound__button" onClick={goBack}>
        Назад
      </button>
    </main>
  );
}
