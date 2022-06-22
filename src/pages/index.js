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
  listContainerSelector,
  config,
  formValidators,
  template,
  buttonEdit,
  buttonAdd,
  buttonAvatarEdit,
} from "../utils/constants.js";

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-43",
  "62e0023b-a686-42d6-8d26-ce435f692769"
);

const userData = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const cardList = new Section(
  {
    items: [],
    renderer: (obj) => {
      cardList.addItem(createNewCard(obj));
    },
  },
  listContainerSelector
);

// отрисовка карточек
cardList.renderItems();

//PromiseAll получаем данные пользователя, получаем карточки

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userInfo, cards]) => {
    userData.setUserInfo(userInfo);

    cards.forEach((card) => {
      cardList.addItem(createNewCard(card));
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Попап Preview
const popupPreviewImage = new PopupWithImage("#popup-preview");
popupPreviewImage.setEventListeners();

// Попап Confirmation
const popupConfirmation = new PopupWithConfirmation("#popup-confirm");
popupConfirmation.setEventListeners();

//Попап добавления карточки
const popupPlace = new PopupWithForm({
  popupSelector: "#popup-place",
  handleFormSubmit: (formData) => {
    popupPlace.changeButtonText("Сохранение...");
    api
      .addCard(formData)
      .then((obj) => {
        cardList.addItem(createNewCard(obj));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupPlace.changeButtonText("Создать");
      });
  },
  formValidators: formValidators,
});

popupPlace.closePopup();
popupPlace.setEventListeners();

const handleCardClick = function (name, link) {
  popupPreviewImage.openPopup({ name: name, link: link });
};

//Создание и Удаление карточки, Лайки
function createNewCard(obj) {
  const userId = userData.getUserInfo().id;

  obj.removable = obj.owner._id === userData.getUserInfo().id;

  const likeByUser = obj.likes.filter((item) => item._id === userId).length > 0;

  const card = new Card({
    obj: obj,
    template: template,
    handleCardClick: handleCardClick,
    handleCardDelete: (cardId, delBtnEvt) => {
      popupConfirmation.setSubmitAction(() => {
        api
          .deleteCard(cardId)
          .then((obj) => {
            card.handleRemoveCard(delBtnEvt);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      popupConfirmation.openPopup();
    },
    handleCardLike: (cardId) => {
      if (card.getIsLiked()) {
        api
          .deleteLikes(cardId)
          .then((newCardData) => card.setLikesCounter(newCardData.likes.length))
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .setLikes(cardId)
          .then((newCardData) => card.setLikesCounter(newCardData.likes.length))
          .catch((err) => {
            console.log(err);
          });
      }
    },
    likeByUser: likeByUser,
  });

  return card.createCard();
}

// Попап обновления профиля
const popupProfile = new PopupWithForm({
  popupSelector: "#popup-profile",
  handleFormSubmit: (formData) => {
    popupProfile.changeButtonText("Сохранение...");
    api
      .setUserInfo(formData)
      .then((userNewData) => {
        userData.setUserInfo(userNewData);
      })
      .then(() => popupProfile.closePopup())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupProfile.changeButtonText("Сохранить");
      });
  },
  formValidators: formValidators,
});
popupProfile.setEventListeners();

// Попап обновления аватара
const popupAvatar = new PopupWithForm({
  popupSelector: "#popup-avatar",
  handleFormSubmit: (avatarData) => {
    popupAvatar.changeButtonText("Сохранение...");
    api
      .changeUserAvatar(avatarData)
      .then((userNewAvatar) => {
        userData.setUserInfo(userNewAvatar.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.changeButtonText("Сохранить");
      });

    popupAvatar.closePopup();
  },
  formValidators: formValidators,
});
popupAvatar.setEventListeners();

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

// Слушатели на кнопки
buttonEdit.addEventListener("click", (evt) => {
  const userInfo = userData.getUserInfo();
  popupProfile.setInputValues(userInfo);
  popupProfile.openPopup(evt);
});

buttonAdd.addEventListener("click", (evt) => popupPlace.openPopup(evt));

buttonAvatarEdit.addEventListener("click", (evt) => popupAvatar.openPopup(evt));
