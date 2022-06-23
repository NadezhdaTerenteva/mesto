export default class Card {
  constructor({
    obj,
    template,
    handleCardClick,
    handleCardDelete,
    handleCardLike,
    likeByUser,
  }) {
    this._name = obj.name;
    this._link = obj.link;
    this._id = obj._id;
    this._removable = obj.removable;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._likes = obj.likes;
    this._isLiked = likeByUser;
  }

  createCard() {
    this._item = this._template.content.querySelector('.photo-grid__item').cloneNode(true);
    this._item.querySelector(".photo-grid__item-name").textContent = this._name;
    this._counterElement = this._item.querySelector(
      ".photo-grid__item-like-counter"
    );
    this._likeElement = this._item.querySelector(".photo-grid__item-like-icon");

    const image = this._item.querySelector(".photo-grid__item-img");

    image.src = this._link;
    image.alt = this._name;

    if (this._removable === false) {
      const buttonRemove = this._item
        .querySelector(".photo-grid__remove-button")
        .classList.add("photo-grid__remove-button_hidden");
    }

    if (this._isLiked === true) {
      this._renderLikeActive(this._likeElement);
    }

    this.setLikesCounter(this._likes.length);

    this._setEventListeners();

    return this._item;
  }

  getCardId(obj) {
    return obj._id;
  }

  handleRemoveCard() {
    this._item.remove();
    this._item = null;
  }

  _likeImage(evt) {
    this._renderLikeActive(evt.target);
    this.setIsLiked(!this._isLiked);
  }

  _renderLikeActive(likeElement) {
    likeElement.classList.toggle("photo-grid__item-like-icon_active");
  }

  setLikesCounter(likesCount) {
    this._counterElement.textContent = likesCount;
  }

  _setEventListeners() {
    this._item
      .querySelector(".photo-grid__remove-button")
      .addEventListener("click", (evt) => {
        this._handleCardDelete(this._id, evt);
      });

    this._item
      .querySelector(".photo-grid__item-like-icon")
      .addEventListener("click", (evt) => {
        this._handleCardLike(this._id);
        this._likeImage(evt);
      });

    this._item
      .querySelector(".photo-grid__item-img")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
  }

  getIsLiked() {
    return this._isLiked;
  }
}
