export default class Card {
  constructor(data, handleCardClick, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }
  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
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
    this._image = this._element.querySelector(".element__image");
    this._title = this._element.querySelector(".element__title");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
