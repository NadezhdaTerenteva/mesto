export default class UserInfo {
  constructor({ titleSelector, subtitleSelector }) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileSubTitle = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      job: this._profileSubTitle.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._profileTitle.textContent = name;
    this._profileSubTitle.textContent = job;
  }
}
