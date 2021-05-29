export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closePopupBtn = this._popup.querySelector(".popup__close");

    this._handlerEscClose = this._handlerEscClose.bind(this);
    this.close = this.close.bind(this);
  }
  _handlerEscClose(event) {
    if (event.key === "Escape" || event.target === this._popup) {
      this.close();
    }
  }
  open() {
    this._popup.classList.add('popup_shown');
    document.addEventListener('keydown', this._handlerEscClose);
    this._popup.addEventListener('click', this._handlerEscClose);
  }
  close() {
    this._popup.classList.remove('popup_shown');
    document.removeEventListener('keydown', this._handlerEscClose);
    this._popup.removeEventListener('click', this._handlerEscClose);
  }
  setEventListeners() {
    this._closePopupBtn.addEventListener('click', this.close);
  }
}