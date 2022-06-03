import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".popup__input");
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

      this._form.reset();
      this.closePopup();
    });

    super.setEventListeners();
  }

  close() {
    this._popup.querySelector("#place-data-form").resetValidation();
    super.closePopup();
  }
}
