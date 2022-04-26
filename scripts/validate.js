
function enableValidation(config) {
  const form = document.querySelector(config.formSelector);
  const inputs = document.querySelectorAll(config.inputSelector);

  inputs.forEach((element) => {
    element.addEventListener('input', (event) => handleFormInput(event, form, config));
  });

  form.addEventListener('submit', (event) => handleFormSubmit(event, form));
  //form.addEventListener('input', (event) => handleFormInput(event));

  toggleButton(form, config);
}



function toggleButton(form, config) {
  const button = document.querySelector(config.submitButtonSelector);
  button.disabled = !form.checkValidity();

  button.classList.toggle('popup__button_disabled', !form.checkValidity());
}

function handleFormSubmit(event, form) {
  event.preventDefault();

  //const form = event.currentTarget;

  if(form.checkValidity()) {
    alert("From is valid")
  } else {
    alert("From is invalid");
  }
}

function handleFormInput(event) {
  const input = event.target;
  const errorNode = document.querySelector(`#${input.id}-error`);

  if(input.validity.valid) {
    errorNode.textContent = '';
  } else {
    errorNode.textContent = input.validationMessage;
  }

  toggleButton(form, config);
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
