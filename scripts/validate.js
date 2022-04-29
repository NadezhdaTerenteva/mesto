
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error-visible'
};


function toggleButton(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const formInvalid = !form.checkValidity();
  button.disabled = formInvalid;

  button.classList.toggle(config.inactiveButtonClass, formInvalid);
}


function enableValidation(pForm) {
  const inputs = Array.from(pForm.querySelectorAll(config.inputSelector));

  inputs.forEach((element) => {
    element.addEventListener('input', (event) => handleFormInput(event, pForm, config));
  });

  toggleButton(pForm, config);
}


function handleFormInput(event, form, config) {
  const input = event.target;
  const errorNode = form.querySelector(`#${input.id}-error`);

  if(input.validity.valid) {
    errorNode.textContent = '';
  } else {
    errorNode.textContent = input.validationMessage;
    errorNode.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);
    }

  toggleButton(form, config);
}


const forms = [...document.querySelectorAll(config.formSelector)];

forms.forEach(function(form) {

  enableValidation(form, config);

})

//Проверка валидности формы
// function handleFormSubmit(event, form) {
//   event.preventDefault();

//   //const form = event.currentTarget;

//   if(form.checkValidity()) {
//     alert("From is valid")
//   } else {
//     alert("From is invalid");
//   }
// }
