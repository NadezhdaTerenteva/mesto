import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector("#confirm-button");
  }

  setEventListeners() {
    this._confirmButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._setSubmitAction();

      this.closePopup();
  });
}

  setSubmitAction(callback) {
    this._setSubmitAction = callback;
  }
}
