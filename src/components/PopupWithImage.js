import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePreview = this._popup.querySelector(".popup__photo-preview-img");
    this._imagePreviewTitle = this._popup.querySelector(
      ".popup__photo-preview-title"
    );
  }

  openPopup(image) {
    this._imagePreviewTitle.textContent = image.name;
    this._imagePreview.src = image.link;
    this._imagePreview.alt = image.name;

    super.openPopup();
  }
}
