export default class FormValidator {
  constructor(formData, formElement) {
    this._formSelector = formData.formSelector;
    this._inputSelector = formData.inputSelector;
    this._submitButtonSelector = formData.submitButtonSelector;
    this._inactiveButtonClass = formData.inactiveButtonClass;
    this._inputErrorClass = formData.inputErrorClass;
    this._errorClass = formData.errorClass;
    this._inputList = formData.inputList;
    this._submitButton = formData.submitButton;

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
  _hasInvalidInput() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    return this._inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }
  _setEventListeners() {
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    ); 
    this.toggleButtonState(this._inputList, this._submitButton);
    this._inputList.forEach((inputSelector) => {
      inputSelector.addEventListener("input", () => {
        this._isValid(inputSelector);
        this.toggleButtonState(this._inputList, this._submitButton);
      });
    });
  }
  toggleButtonState() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const submitButtonSelector = this._formElement.querySelector(
      '.form__save'
    );
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