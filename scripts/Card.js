export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._likeElement();
      });
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", (event) => {
        this._deleteElement(event);
      });
  }
  _likeElement() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }
  _deleteElement(event) {
    event.target.closest(".element").remove();
  }
  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.element__image');
    this._titleElement = this._element.querySelector('.element__title');
    this._setEventListeners();
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    return this._element;
  }
}
