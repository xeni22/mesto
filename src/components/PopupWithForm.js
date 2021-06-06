import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputs = this._form.querySelectorAll(".form__input");
    this._submitBtn = this._form.querySelector(".form__save");
    this._submitBtnCaption = this._submitBtn.value;
  }
  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  savingData() {
    this._submitBtn.value = "Сохранение...";
  }
  returnSubmitBtnInitialValue() {
    this._submitBtn.value = this._submitBtnCaption;
  }
  close() {
    this._form.reset();
    super.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
    });
  }
}
