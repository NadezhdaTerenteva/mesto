import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type-error",
  errorClass: "popup__error-visible",
};

const listContainer = document.querySelector(".photo-grid__items");
const template = document.querySelector(".card__item");

const buttonEdit = document.querySelector(".profile__edit-button");

const popups = document.querySelectorAll(".popup");
const popupProfile = document.getElementById("popup-profile");
const popupPlace = document.getElementById("popup-place");
const popupPreview = document.getElementById("popup-preview");

const buttonAdd = document.querySelector(".profile__add-button");

const formUserElement = document.querySelector("#user-data-form");
const formPlaceElement = document.querySelector("#place-data-form");

const nameInput = formUserElement.querySelector("#name");
const jobInput = formUserElement.querySelector("#job");

const placeInput = formPlaceElement.querySelector("#place");
const linkInput = formPlaceElement.querySelector("#link");

const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");

const openPopupPreview = function (item) {
  const imagePreview = popupPreview.querySelector(".popup__photo-preview-img");
  const imagePreviewTitle = popupPreview.querySelector(
    ".popup__photo-preview-title"
  );

  imagePreviewTitle.textContent = item.name;
  imagePreview.src = item.link;
  imagePreview.alt = item.name;
  showPopup(popupPreview);
};

function render() {
  const html = initialCards.map((item) => {
    const card = new Card(item.name, item.link, template, openPopupPreview);
    return card.createCard();
  });
  listContainer.prepend(...html);
}

function handleAddCard(evt) {
  evt.preventDefault();

  const newPlace = {
    name: placeInput.value,
    link: linkInput.value,
  };

  const card = new Card(
    placeInput.value,
    linkInput.value,
    template,
    openPopupPreview
  );
  const newNode = card.createCard(newPlace);
  listContainer.prepend(newNode);

  const button = popupPlace.querySelector(".popup__submit-button");

  evt.target.reset();
  button.disabled = true;
  button.classList.add("popup__submit-button_disabled");

  closePopup(popupPlace);
}

render();

function showPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
  showPopup(popupProfile);
}

function openPopupPlace() {
  showPopup(popupPlace);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup); //overlay click
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;

  closePopup(popupProfile);
}

buttonEdit.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupPlace);

formUserElement.addEventListener("submit", handleProfileFormSubmit);
formPlaceElement.addEventListener("submit", handleAddCard);

const cardFormValidator = new FormValidator(config, formPlaceElement);
cardFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, formUserElement);
editFormValidator.enableValidation();
