import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit, formValidators}) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._popupPlaceForm = this._popup.querySelector("#place-data-form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._formValidators = formValidators;
    this._validator = this._formValidators[this._form.getAttribute("name")];
    this._submitButton = this._form.querySelector(".popup__submit-button");
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
    });

    super.setEventListeners();
  }

  closePopup() {
    super.closePopup();


    if (this._validator) {
      this._validator.resetValidation();
    }
  }

  resetForm () {
    this._form.reset();
  }

  changeButtonText(text) {
    this._submitButton.textContent = text;
  }
}
