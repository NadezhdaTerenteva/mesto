const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('#field_1'); 
const jobInput = formElement.querySelector('#field_2');

function togglePopup() {
	popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
	evt.preventDefault(); 
	
	const nameInputValue = nameInput.value;
	const jobInputValue = jobInput.value;

	const profileTitle = document.querySelector('.profile__title') ;
	const profileSubTitle = document.querySelector('.profile__subtitle');

	profileTitle.textContent = nameInputValue;
	profileSubTitle.textContent = jobInputValue;	
		
	togglePopup();
}

editButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);

formElement.addEventListener('submit', formSubmitHandler); 