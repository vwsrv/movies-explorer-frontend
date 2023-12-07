class MainApi {
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

  regiter(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }
}

export const userApi = new MainApi({
  baseUrl: "https://localhost:3000",
  headers: { "Content-Type": "application/json" },
});
