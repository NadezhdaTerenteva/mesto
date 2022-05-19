export default class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._popupPreview = document.getElementById("popup-preview");
  }

  _handleRemoveCard(evt) {
    const card = evt.target.closest(".photo-grid__item");
    card.remove();
  }

  _likeImage(evt) {
    evt.target.classList.toggle("photo-grid__item-like-icon_active");
  }

  _openPopupPreview(item) {
    const imagePreview = this._popupPreview.querySelector(
      ".popup__photo-preview-img"
    );
    const imagePreviewTitle = this._popupPreview.querySelector(
      ".popup__photo-preview-title"
    );

    imagePreviewTitle.textContent = this._item.name;
    imagePreview.src = this._item.link;
    imagePreview.alt = this._item.name;
    this._showPopupPreview();
  }

  _showPopupPreview() {
    this._popupPreview.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {
      this._closeByEscape(evt);
    });
  }

  _closeByEscape(evt) {
    if (evt.code === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      openedPopup.classList.remove("popup_opened");
    }
    document.removeEventListener("keydown", (evt) => {
      this._closeByEscape(evt);
    });
  }

  createCard() {
    this._item = this._template.content.cloneNode(true);
    this._item.querySelector(".photo-grid__item-name").textContent = this._name;

    const image = this._item.querySelector(".photo-grid__item-img");

    image.src = this._link;
    image.alt = this._name;

    image.addEventListener("click", () => {
      this._openPopupPreview();
    });

    this._item
      .querySelector(".photo-grid__remove-button")
      .addEventListener("click", (evt) => {
        this._handleRemoveCard(evt);
      });

    this._item
      .querySelector(".photo-grid__item-like-icon")
      .addEventListener("click", (evt) => {
        this._likeImage(evt);
      });

    return this._item;
  }
}
