import { formValidators } from "../utils/constants";

export default class Popup {
  constructor(popupSelector) {

    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = document.querySelector(".popup__close-button");
    this._form = this._popup.querySelector(".popup__form");
    this._handleEscClose = this._handleEscClose.bind(this);

  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);

    
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);

    this._form.reset();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.closePopup(evt); //overlay click
      }

      if (evt.target.classList.contains("popup__close-button")) {
        this.closePopup();
      }
    });
  }
}
