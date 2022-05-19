export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _toggleButton() {
    const button = this._form.querySelector(this._config.submitButtonSelector);
    const formInvalid = !this._form.checkValidity();
    button.disabled = formInvalid;

    button.classList.toggle(this._config.inactiveButtonClass, formInvalid);
  }

  _setEventListeners() {
    const inputs = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );

    inputs.forEach((element) => {
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
