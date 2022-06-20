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

api.getUserInfo().then((userInfo) => {

  userData.setUserInfo(userInfo);

  api
    .getCards()
    .then((cards) => {
      cards.forEach(card => {
        cardList.addItem(createNewCard(card));
      })
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
          // const cardList = new Section(
          //   {
          //     items: [],
          //     renderer: (obj) => {
          //       obj.removable = true;
          //       cardList.addItem(createNewCard(obj));
          //     },
          //   },
          //   listContainerSelector
          // );
          // cardList.renderItems();
          cardList.addItem(createNewCard(obj));
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

const popupConfirmation = new PopupWithConfirmation("#popup-confirm");
popupConfirmation.setEventListeners();



//Создание и Удаление карточки, Лайки
function createNewCard(obj) {

  const userId = userData.getUserInfo().id;

  obj.removable = obj.owner._id === userData.getUserInfo().id;

  const likeByUser = obj.likes.filter(item => item._id === userId).length > 0;

  //obj = {_id, owner:{}, likes:[{owner}]}
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
        api.deleteLikes(cardId)
        .then((newCardData) => card.setLikesCounter(newCardData.likes.length))
        .catch((err) => {
          console.log(err);
        });
      } else {
        api.setLikes(cardId)
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
      api.setUserInfo(formData)
      .then((userNewData) => {
        userData.setUserInfo(userNewData);
      })
      .catch((err) => {
        console.log(err);
      });

      popupProfile.closePopup();
    },
    formValidators: formValidators,
  }
);

popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm(

  {
    popupSelector: "#popup-avatar",
    handleFormSubmit: (avatarData) => {
      // объект, который мы передадим при вызове handleFormSubmit
      // окажется на месте параметра formData
      api.changeUserAvatar(avatarData)
      .then((userNewAvatar) => {
        userData.setUserInfo(userNewAvatar.avatar);
      })
      .catch((err) => {
        console.log(err);
      });

      popupAvatar.closePopup();
    },
    formValidators: formValidators,

  }
);

popupAvatar.setEventListeners();

buttonEdit.addEventListener("click", (evt) => {
  const userInfo = userData.getUserInfo();
  popupProfile.setInputValues(userInfo);
  popupProfile.openPopup(evt);
});

buttonAdd.addEventListener("click", (evt) => popupPlace.openPopup(evt));

buttonAvatarEdit.addEventListener("click", (evt) => popupAvatar.openPopup(evt));
