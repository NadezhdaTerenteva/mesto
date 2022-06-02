import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

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

const listContainerSelector = '.photo-grid__items';

const popupSelector = '.popup';


const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type-error",
  errorClass: "popup__error-visible",
};

const formValidators = {};

const template = document.querySelector(".card__item");

const buttonEdit = document.querySelector(".profile__edit-button");

const popups = document.querySelectorAll(".popup");
//const popupProfile = document.getElementById("popup-profile");
//const popupPlace = document.getElementById("popup-place");
const popupPreview = document.getElementById("popup-preview");

const buttonAdd = document.querySelector(".profile__add-button");

const formUserElement = document.querySelector("#user-data-form");
const formPlaceElement = document.querySelector("#place-data-form");

export const nameInput = formUserElement.querySelector("#name");
export const jobInput = formUserElement.querySelector("#job");

const placeInput = formPlaceElement.querySelector("#place");
const linkInput = formPlaceElement.querySelector("#link");

const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");

//

const popupPreviewImage = new PopupWithImage('#popup-preview');
popupPreviewImage.setEventListeners();

const handleCardClick = function (name, link) {
  popupPreviewImage.openPopup({name: name, link:link})
};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, template, handleCardClick);
    const cardElement = card.createCard();

    cardList.addItem(cardElement);
  }
}, listContainerSelector);

 // отрисовка карточек
 cardList.renderItems();

const popupPlace = new PopupWithForm({
  // создаём экземпляр попапа
  popupSelector: '#popup-place',
  handleFormSubmit: (formData) => {
  // объект, который мы передадим при вызове handleFormSubmit
  // окажется на месте параметра formData
    const card = new Card(formData, template, handleCardClick);
    const cardElement = card.createCard();

    cardList.addItem(cardElement);
    }
  }
);

popupPlace.setEventListeners();

const popupProfile = new PopupWithForm({
  // создаём экземпляр попапа
  popupSelector: '#popup-profile',
  handleFormSubmit: (formData) => {
    // объект, который мы передадим при вызове handleFormSubmit
    // окажется на месте параметра formData
      const userData = new UserInfo();
  }
});

popupProfile.setEventListeners();


function handleAddCard(evt) {
  evt.preventDefault();

  const newPlace = {
    name: placeInput.value,
    link: linkInput.value,
  };

  const newNode = createCard(newPlace);
  listContainer.prepend(newNode);

  formValidators["place-data"].resetValidation();

  closePopup(popupPlace);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;

  closePopup(popupProfile);
}


buttonEdit.addEventListener("click", (evt) => popupProfile.openPopup(evt));
buttonAdd.addEventListener("click", (evt) => popupPlace.openPopup(evt));

formUserElement.addEventListener("submit", handleProfileFormSubmit);
formPlaceElement.addEventListener("submit", handleAddCard);

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
