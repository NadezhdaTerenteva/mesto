import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, formValidators }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValidators = formValidators;
  }

  openPopup() {
    const validator = this._formValidators[this._form.getAttribute("name")];
    validator.resetValidation();

    super.openPopup();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setInputValues(initialdata) {
    this._inputList.forEach((input) => {
      if (initialdata.hasOwnProperty(input.name)) {
        input.value = initialdata[input.name];
      }
    });
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this.closePopup();
    });

    super.setEventListeners();
  }

  closePopup() {
    super.closePopup();
  }
}
