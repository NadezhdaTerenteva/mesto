import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector("#confirm-button");
  }

  setSubmitAction(callback) {
    this._confirmButton.addEventListener("submit", (evt) => {
      evt.preventDefault();
      handleCardDelete();

      this.closePopup();
    });
  }
}
