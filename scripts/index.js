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

const listContainer = document.querySelector(".photo-grid__items");
const template = document.querySelector(".card__item");

const buttonEdit = document.querySelector(".profile__edit-button");

const popups = document.querySelectorAll(".popup");
const popupProfile = document.getElementById("popup-profile");
const popupPlace = document.getElementById("popup-place");
const popupPreview = document.getElementById("popup-preview");

// const popupCloseButtons = document.getElementsByClassName(
//   "popup__close-button"
// );
const buttonAdd = document.querySelector(".profile__add-button");

const formUserElement = document.querySelector("#user-data-form");
const formPlaceElement = document.querySelector("#place-data-form");

const nameInput = formUserElement.querySelector("#name");
const jobInput = formUserElement.querySelector("#job");

const placeInput = formPlaceElement.querySelector("#place");
const linkInput = formPlaceElement.querySelector("#link");

const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");

const imagePreviewTitle = popupPreview.querySelector(".popup__photo-preview-title");
const imagePreview = popupPreview.querySelector(".popup__photo-preview-img");

function render() {
  const html = initialCards.map(createCard);
  listContainer.prepend(...html);
}

function createCard(item) {
  const newItem = template.content.cloneNode(true);

  const title = newItem.querySelector(".photo-grid__item-name");
  title.textContent = item.name;

  const image = newItem.querySelector(".photo-grid__item-img");
  image.src = item.link;
  image.alt = item.name;
  image.addEventListener("click", () => openPopupPreview(item));

  const buttonRemove = newItem.querySelector(".photo-grid__remove-button");
  buttonRemove.addEventListener("click", handleRemoveCard);

  const likeButtons = newItem.querySelector(".photo-grid__item-like-icon");
  likeButtons.addEventListener("click", likeImage);

  return newItem;
}

function handleAddCard(evt, btn) {
  evt.preventDefault();

  const newPlace = {
    name: placeInput.value,
    link: linkInput.value,
  };

  const newNode = createCard(newPlace);
  listContainer.prepend(newNode);

  const button = popupPlace.querySelector(".popup__submit-button");

  evt.target.reset();
  button.classList.add("popup__submit-button_disabled");

  closePopup(popupPlace);
}

render();

function handleRemoveCard(evt) {
  const card = evt.target.closest(".photo-grid__item");
  card.remove();
}

function likeImage(evt) {
  evt.target.classList.toggle("photo-grid__item-like-icon_active");
}

function showPopup(popup) {
  popup.classList.add("popup_opened");

  document.addEventListener('keydown', (evt) => {

    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  })
}


function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
  showPopup(popupProfile);
}

function openPopupPlace() {
  showPopup(popupPlace);
}

function openPopupPreview(item) {
  imagePreviewTitle.textContent = item.name;
  imagePreview.src = item.link;
  imagePreview.alt = item.name;
  showPopup(popupPreview);
}

//Находит родительский попап
function getParentPopup(node) {
  const popup = node.closest(".popup");
  return popup;
}

//Распаковывает массив без присвоения переменной
// [...popupCloseButtons].forEach(function (btn) {
//   btn.addEventListener("click", function () {
//     const parentPopup = getParentPopup(btn);
//     closePopup(parentPopup);
//   });
// });

//Закрытие кликом на оверлей
// [...popups].forEach(function (popup) {
//   popup.addEventListener("click", function (event) {
//     if(event.target === event.currentTarget) {
//       closePopup(popup);
//     }
//   });
// });


function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
    })
  })

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubTitle.textContent = jobInput.value;

  closePopup(popupProfile);
}

buttonEdit.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupPlace);

formUserElement.addEventListener("submit", handleProfileFormSubmit);
formPlaceElement.addEventListener("submit", handleAddCard);


