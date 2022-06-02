
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = document.querySelector(".popup__close-button");
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", evt => this._handleEscClose(evt));
  }

  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", evt => this._handleEscClose(evt));
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this.closePopup(openedPopup);
    }
  }

  setEventListeners() {
    this._popupCloseButton
      .addEventListener("click", (evt) => {
        this.closePopup(evt);
      });

    this._popup
      .addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.closePopup(evt); //overlay click
      }

      if (evt.target.classList.contains("popup__close-button")) {
        this.closePopup();
      }
    });
  }
}
