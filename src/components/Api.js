export default class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      "Content-type": "application/json",
      Authorization: "62e0023b-a686-42d6-8d26-ce435f692769",
    };
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error");
  }

  getUserInfo() {
    return fetch("https://nomoreparties.co/v1/cohort-43/users/me", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResult);
  }

  setUserInfo(userData) {
    return fetch("https://nomoreparties.co/v1/cohort-43/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(this._checkResult);
  }

  changeUserAvatar(userData) {
    return fetch("https://nomoreparties.co/v1/cohort-43/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar,
      }),
    }).then(this._checkResult);
  }

  getCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-43/cards", {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResult);
  }

  addCard(obj) {
    const item = {
      name: obj.name,
      link: obj.link,
    };
    return fetch("https://mesto.nomoreparties.co/v1/cohort-43/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: obj.place,
        link: obj.link,
      }),
    }).then(this._checkResult);
  }

  deleteCard(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-43/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
        body: JSON.stringify({
          _id: cardId,
        }),
      }).then(this._checkResult);
  }

  setLikes(cardId, likes) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-43/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
        body: JSON.stringify({
          _id: cardId,
          likes: [],
        }),
      }).then(this._checkResult);
  }

  deleteLikes(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-43/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
        body: JSON.stringify({
          _id: cardId,
        }),
      }).then(this._checkResult);
  }
}
