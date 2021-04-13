import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputs = this._form.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputs.forEach((item) => {
      this._inputValues[item.name] = item.value;
    })
    return this._inputValues;
  }
  close() {
    this._form.reset();
    super.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
    });
  }
}