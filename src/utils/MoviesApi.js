class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка соединения ${res.status}`);
  }

  getMoviesCards() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }
}

export const movies = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: { "Content-Type": "application/json" },
});
