export default class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  getUserInfo() {
    return fetch("https://nomoreparties.co/v1/cohort-43/users/me", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "62e0023b-a686-42d6-8d26-ce435f692769",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    });
  }

 setUserInfo(userData) {
  return fetch("https://nomoreparties.co/v1/cohort-43/users/me", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: "62e0023b-a686-42d6-8d26-ce435f692769",
    },
    body: JSON.stringify({
      name: userData.name,
      about: userData.about,
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error");
  });
 }

 changeUserAvatar(userData) {
  return fetch("https://nomoreparties.co/v1/cohort-43/users/me/avatar", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: "62e0023b-a686-42d6-8d26-ce435f692769",
    },
    body: JSON.stringify({
      avatar: userData.avatar,
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Error");
  });
 }

  getCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-43/cards", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "62e0023b-a686-42d6-8d26-ce435f692769",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Error");
    });
  }

  addCard(obj) {
    const item = {
      name: obj.name,
      link: obj.link,
    };
    return fetch("https://mesto.nomoreparties.co/v1/cohort-43/cards", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "62e0023b-a686-42d6-8d26-ce435f692769",
      },
      body: JSON.stringify({
        name: obj.place,
        link: obj.link
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Error");
    });
  }

  deleteCard (cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-43/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: "62e0023b-a686-42d6-8d26-ce435f692769",
      },
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("Error");
    });
    }

    setLikes (cardId, likes) {
      return fetch (`https://mesto.nomoreparties.co/v1/cohort-43/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Content-length": "0",
          Authorization: "62e0023b-a686-42d6-8d26-ce435f692769",
        },
        body: JSON.stringify({
          _id: cardId,
          likes: [],
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error");
      })
    }

    deleteLikes (cardId) {
      return fetch (`https://mesto.nomoreparties.co/v1/cohort-43/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "62e0023b-a686-42d6-8d26-ce435f692769",
        },
        body: JSON.stringify({
          _id: cardId,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Error");
      })
    }

  }



