class MainApi {
  constructor({ baseUrl, headers, credentials }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка соединения ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: this._credentials,
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

  regiter(email, password, name) {
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
}

export const userApi = new MainApi({
  baseUrl: "http://localhost:3000",
  headers: { 
    "Accept" : "application/json",
    "Content-Type": "application/json" },
  credentials: "include",
});
