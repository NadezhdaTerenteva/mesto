import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Api from "../components/Api";

import {
  initialCards,
  listContainerSelector,
  config,
  formValidators,
  template,
  buttonEdit,
  buttonAdd,
} from "../utils/constants.js";

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-43",
  "62e0023b-a686-42d6-8d26-ce435f692769"
);

api.getUserInfo().then((userInfo) => {
  const userData = new UserInfo({
    titleSelector: ".profile__title",
    subtitleSelector: ".profile__subtitle",
  });

  userData.setUserInfo(userInfo);

  api
    .getCards()
    .then((cards) => {
      const cardList = new Section(
        {
          items: cards,
          renderer: (obj) => {
            obj.removable = obj.owner._id === userData.getUserInfo().id;
            cardList.addItem(createNewCard(obj));
          },
        },
        listContainerSelector
      );

      // отрисовка карточек
      cardList.renderItems();
    })

    .catch((err) => {
      console.log(err);
    });
});

const popupPlace = new PopupWithForm(
  // создаём экземпляр попапа
  {
    popupSelector: "#popup-place",
    handleFormSubmit: (formData) => {
      // объект, который мы передадим при вызове handleFormSubmit
      // окажется на месте параметра formData
      api
        .addCard(formData)
        .then((obj) => {
          const cardList = new Section(
            {
              items: [],
              renderer: (obj) => {
                obj.removable = true;
                cardList.addItem(createNewCard(obj));
              },
            },
            listContainerSelector
          );
          cardList.renderItems();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    formValidators: formValidators,
  }
);

popupPlace.closePopup();
popupPlace.setEventListeners();

const popupPreviewImage = new PopupWithImage("#popup-preview");
popupPreviewImage.setEventListeners();

const handleCardClick = function (name, link) {
  popupPreviewImage.openPopup({ name: name, link: link });
};

//Удаление карточки

const card = new Card({
  obj: obj,
  template: template,
  handleCardClick: handleCardClick,
  handleCardDelete: (cardId) => {
    const popupConfirmation = new PopupWithConfirmation("#popup-confirm");

    popupConfirmation.openPopup();
    popupConfirmation.setEventListeners();

    popupConfirmation.setSubmitAction(() => {
      api
        .deleteCard(cardId)
        .then((obj) => {
          card._handleRemoveCard();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
});

function createNewCard(obj) {
  const card = new Card(obj, template, handleCardClick);
  return card.createCard();
}

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

const popupProfile = new PopupWithForm(
  // создаём экземпляр попапа
  {
    popupSelector: "#popup-profile",
    handleFormSubmit: (formData) => {
      // объект, который мы передадим при вызове handleFormSubmit
      // окажется на месте параметра formData
      userData.setUserInfo({ name: formData.name, job: formData.job });

      popupProfile.closePopup();
    },
    formValidators: formValidators,
  }
);

popupProfile.setEventListeners();

buttonEdit.addEventListener("click", (evt) => {
  const userInfo = userData.getUserInfo();
  popupProfile.setInputValues(userInfo);
  popupProfile.openPopup(evt);
});

buttonAdd.addEventListener("click", (evt) => popupPlace.openPopup(evt));
