export default class Card {
  constructor({obj, template, handleCardClick, handleCardDelete}) {
    this._name = obj.name;
    this._link = obj.link;
    this._id = obj._id;
    this._removable = obj.removable;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  createCard() {
    this._item = this._template.content.cloneNode(true);
    this._item.querySelector(".photo-grid__item-name").textContent = this._name;

    const image = this._item.querySelector(".photo-grid__item-img");

    image.src = this._link;
    image.alt = this._name;

    if (this._removable === false) {
        const buttonRemove = this._item.querySelector(".photo-grid__remove-button").classList.add("photo-grid__remove-button_hidden")
    }

    this._setEventListeners();

    return this._item;
  }

  getCardId(obj) {
    return obj._id;
  }

  _handleRemoveCard(evt) {
    const card = evt.target.closest(".photo-grid__item");
    card.remove();
  }

  _likeImage(evt) {
    evt.target.classList.toggle("photo-grid__item-like-icon_active");
  }

  _setEventListeners() {
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

    this._item
      .querySelector(".photo-grid__item-img")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }
}
