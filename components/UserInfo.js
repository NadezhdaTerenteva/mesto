
export default class UserInfo {
  constructor ({name, job}) {
  this._name = nameInput;
  this._job = jobInput;
  }

  getUserInfo() {
    this._element.querySelector('.profile__title').textContent = this._name;
    this._element.querySelector('.profile__subtitle').textContent = this._job;

    return this._element;
  };


  setUserInfo() {
    // this._popup
    // .querySelector("#place-data-form")
    // .addEventListener("submit", (evt) => {
    //   evt.preventDefault();
    //   this._handleFormSubmit(this._getInputValues());
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(".popup__input");

    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }
}


