
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled ',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error-visible'
};


function toggleButton(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const formInvalid = !form.checkValidity();
  button.disabled = formInvalid;

  button.classList.toggle('popup__submit-button_disabled', formInvalid);
}

function enableValidation(pForm) {

  //const forms = Array.from(document.querySelectorAll(config.formSelector));
  //const form = document.querySelector(config.formSelector);
  const inputs = Array.from(pForm.querySelectorAll(config.inputSelector));

  inputs.forEach((element) => {
    element.addEventListener('input', (event) => handleFormInput(event, pForm, config));
  });


  //forms.addEventListener('submit', (event) => handleFormSubmit(event, forms));
  //form.addEventListener('input', (event) => handleFormInput(event));

  toggleButton(pForm, config);
}

// function handleFormSubmit(event, form) {
//   event.preventDefault();

//   //const form = event.currentTarget;

//   if(form.checkValidity()) {
//     alert("From is valid")
//   } else {
//     alert("From is invalid");
//   }
// }

function handleFormInput(event, form, config) {
  const input = event.target;
  const errorNode = form.querySelector(`#${input.id}-error`);

  if(input.validity.valid) {
    errorNode.textContent = '';
  } else {
    errorNode.textContent = input.validationMessage;
    errorNode.classList.add('popup__error-visible');
    input.classList.add('popup__input_type-error');
  }

  toggleButton(form, config);
}

//enableValidation(config);



const forms = [...document.querySelectorAll(config.formSelector)];

forms.forEach(function(form) {

  enableValidation(form);

})
