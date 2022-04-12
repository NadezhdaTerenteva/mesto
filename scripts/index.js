const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.getElementById('popup-profile');

const popupPlace = document.getElementById('popup-place');

const popupCloseButtons = document.getElementsByClassName('popup__close-button');
const addButton = document.querySelector('.profile__add-button');

const likeButtons = document.getElementsByClassName('photo-grid__item-like-icon');


const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

const placeInput = formElement.querySelector('#place');
const linkInput = formElement.querySelector('#link');

const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');

const imageTitle = document.getElementsByClassName('photo-grid__item-name');
const imageLink = document.getElementsByClassName('photo-grid__item-img');

// function likeImage() {
//   [...likeButtons].forEach(function(like) {
//     like.classList.toggle('photo-grid__item-like-icon_active');
//     });

//   };

  //likeButtons.classList.toggle('photo-grid__item-like-icon_active');
function likeImage(evt) {
  evt.target.classList.toggle('photo-grid__item-like-icon_active');
}

function showPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// и вызов тогда будет такой
/*editFormModal.addEventListener('click', () => openModal(editForm));
cardFormModal.addEventListener('click', () => openModal(cardForm)); */

function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
	showPopup(popupProfile);
}

function openPopupPlace() {
  //nameInput.value = profileTitle.textContent;
  //jobInput.value = profileSubTitle.textContent;
	showPopup(popupPlace);
}

// function closePopupProfile() {
// 	popupProfile.classList.remove('popup_opened');
// }

// function closePopupPlace() {
// 	popupPlace.classList.remove('popup_opened');
// }

function formSubmitHandler(evt) {
	evt.preventDefault();

	profileTitle.textContent = nameInput.value;
	profileSubTitle.textContent = jobInput.value;

	closePopup(getParentPopup(evt.target));
}

editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupPlace);

[...likeButtons].forEach(function(like) {

  like.addEventListener('click',likeImage)
});



formElement.addEventListener('submit', formSubmitHandler);

//Находит родительский попап
function getParentPopup(node) {
  const popup = node.closest('.popup');
  return popup;
}

//Распаковывает массив без присвоения переменной
[...popupCloseButtons].forEach(function(btn) {

  btn.addEventListener('click', function() {

    const parentPopup = getParentPopup(btn);

    const inputs = parentPopup.getElementsByClassName('popup__input');

    [...inputs].forEach(function(input){
      input.value = "";
    });

    closePopup(parentPopup);

  });



});
