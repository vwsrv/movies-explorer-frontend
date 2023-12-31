class MainApi {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  async _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const errorText = await res.json();
    throw new Error(`${errorText.message}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: this._credentials,
      headers: this._headers,
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  updateUserInfo(email, name) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ email, name }),
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ email, password, name }),
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials
    }).then((res) => {
      return this._checkServerResponse(res);
    })
  }

  saveMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: `https://api.nomoreparties.co${movieData.image.url}`,
        trailerLink: movieData.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,
        movieId: movieData.id,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
      }),
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  deleteMovie(movie) {
    return fetch(`${this._baseUrl}/movies/${movie}`, {
      method: "DELETE",
      credentials: this._credentials,
      headers: this._headers,
    })
  }

  getSavedMoviesCards() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: this._credentials,
      headers: this._headers,
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }
}

export const userApi = new MainApi({
  baseUrl: "https://api.vavssrv.nomoredomainsmonster.ru",
  // baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
});
