export default class UserInfo {
  constructor({ titleSelector, subtitleSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileSubTitle = document.querySelector(subtitleSelector);
    this._avatar = "";
    this._id = "";
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubTitle.textContent,
      id: this._id,
      avatar: this._avatar
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._profileTitle.textContent = name;
    this._profileSubTitle.textContent = about;
    this._id = _id;
    this._avatar = avatar;
  }
}
