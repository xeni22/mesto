import { closeByEscape } from "./script.js";
export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
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
    this._element
      .querySelector(".element__image")
      .addEventListener("click", (event) => {
        this._openImage(event);
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
  _openImage(event) {
    const enlargeImagePopup = document.querySelector(
      ".popup_type_enlarge-image"
    );
    const image = enlargeImagePopup.querySelector(".popup__image");
    const figcaption = enlargeImagePopup.querySelector(".popup__caption");
    enlargeImagePopup.classList.add("popup_shown");
    figcaption.textContent = event.target.alt;
    image.src = event.target.src;
    image.alt = event.target.alt;
    document.addEventListener("keydown", closeByEscape);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._alt;
    return this._element;
  }
}
