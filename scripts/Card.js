export default class Card {
  constructor(name, link, template, openPopupPreview) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._popupPreview = document.getElementById("popup-preview");
    this._openPopupPreview = openPopupPreview;
  }

  _handleRemoveCard(evt) {
    const card = evt.target.closest(".photo-grid__item");
    card.remove();
  }

  _likeImage(evt) {
    evt.target.classList.toggle("photo-grid__item-like-icon_active");
  }

  createCard() {
    this._item = this._template.content.cloneNode(true);
    this._item.querySelector(".photo-grid__item-name").textContent = this._name;

    const image = this._item.querySelector(".photo-grid__item-img");

    image.src = this._link;
    image.alt = this._name;

    image.addEventListener("click", () => {
      this._openPopupPreview(image);
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
