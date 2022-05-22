export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._button = this._form.querySelector(this._config.submitButtonSelector);
    this._inputs = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
  }

  _toggleButton() {
    const formInvalid = !this._form.checkValidity();
    this._button.disabled = formInvalid;

    this._button.classList.toggle(
      this._config.inactiveButtonClass,
      formInvalid
    );
  }

  formValidationReset() {
    this._form.reset();

    this._button.disabled = true;
    this._button.classList.add("popup__submit-button_disabled");
  }

  _setEventListeners() {
    this._inputs.forEach((element) => {
      element.addEventListener("input", (event) =>
        this._handleFormInput(event)
      );
    });
    this._toggleButton();
  }

  _handleFormInput(event) {
    const input = event.target;
    const errorNode = this._form.querySelector(`#${input.id}-error`);

    if (input.validity.valid) {
      errorNode.textContent = "";
      errorNode.classList.remove(this._config.errorClass);
      input.classList.remove(this._config.inputErrorClass);
    } else {
      errorNode.textContent = input.validationMessage;
      errorNode.classList.add(this._config.errorClass);
      input.classList.add(this._config.inputErrorClass);
    }

    this._toggleButton();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
