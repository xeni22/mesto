export default class FormValidator {
  constructor(formData, formElement) {
    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }
  _showInputError(inputSelector, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputSelector.id}-error`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(inputSelector) {
    const errorElement = this._formElement.querySelector(
      `#${inputSelector.id}-error`
    );
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }
  _isValid(inputSelector) {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(inputSelector);
    }
  }
  _hasInvalidInput() {
    return this._inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }
  _setEventListeners() {
    this.toggleButtonState(this._inputList, this._submitButton);
    this._formElement.addEventListener("reset", () => {
      this._inputList.forEach((inputSelector) => {
          this._hideInputError(inputSelector)
      });
      this.toggleButtonState(this._submitButton);
    });
    this._inputList.forEach((inputSelector) => {
      inputSelector.addEventListener("input", () => {
        this._isValid(inputSelector);
        this.toggleButtonState(this._inputList, this._submitButton);
      });
    });
  }
  toggleButtonState() {
    const submitButtonSelector = this._formElement.querySelector(".form__save");
    if (this._hasInvalidInput(this._inputList)) {
      submitButtonSelector.setAttribute("disabled", true);
      submitButtonSelector.classList.add(this._inactiveButtonClass);
    } else {
      submitButtonSelector.removeAttribute("disabled");
      submitButtonSelector.classList.remove(this._inactiveButtonClass);
    }
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}