export default class FormValidator {
  constructor(formData, formElement) {
    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this._formElement = formElement;
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
  _hasInvalidInput(inputList) {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }
  _toggleButtonState(inputList, submitButtonSelector) {
    if (this._hasInvalidInput(inputList)) {
      submitButtonSelector.setAttribute("disabled", true);
      submitButtonSelector.classList.add(this._inactiveButtonClass);
    } else {
      submitButtonSelector.removeAttribute("disabled");
      submitButtonSelector.classList.remove(this._inactiveButtonClass);
    }
  }
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState(inputList, submitButton);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener("input", () => {
        this._isValid(inputSelector);
        this._toggleButtonState(inputList, submitButton);
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
