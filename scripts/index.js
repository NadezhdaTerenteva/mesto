const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.getElementById('popup-profile');

const popupPlace = document.getElementById('popup-place');

const popupCloseButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');


const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');

/*function togglePopup() {
	popup.classList.toggle('popup_opened');
}*/

function showPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
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

function closePopupProfile() {
	popupProfile.classList.remove('popup_opened');
}

function closePopupPlace() {
	popupPlace.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
	evt.preventDefault();

	profileTitle.textContent = nameInput.value;
	profileSubTitle.textContent = jobInput.value;

	closePopup();
}

editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupPlace);
popupCloseButton.addEventListener('click', () => closePopup(popupProfile));



formElement.addEventListener('submit', formSubmitHandler);
