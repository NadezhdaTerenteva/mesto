const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');

/*function togglePopup() {
	popup.classList.toggle('popup_opened');
}*/

function openPopup() {
	popup.classList.add('popup_opened');
}

function closePopup() {
	popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
	evt.preventDefault();

	profileTitle.textContent = nameInput.value;
	profileSubTitle.textContent = jobInput.value;

	closePopup();
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);
