export default class Card {
  constructor(
    card,
    currentUser,
    templateSelector,
    handleCardClick,
    { handleToggleLike },
    { handleDeleteCard },
    cardId
  ) {
    this._card = card;
    this._name = card.name;
    this._link = card.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._toggleLike = handleToggleLike;
    this._currentUser = currentUser;
    this._cardId = cardId;
    this._isMyCard = card.owner._id === currentUser._id;
    this._deleteCard = handleDeleteCard;
  }
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }
  _handleToggleLike() {
    if (
      !this._element
        .querySelector(".element__like")
        .classList.contains("element__like_active")
    ) {
      this._toggleLike("PUT", this._card._id)
        .then((card) => {
          this._setLikesCount(card.likes.length);
          this._checkMyLike(card.likes);
        })
        .catch((err) => {
          console.log("Ошибка при постановке лайка", err);
        });
    } else {
      this._toggleLike("DELETE", this._card._id)
        .then((card) => {
          this._setLikesCount(card.likes.length);
          this._checkMyLike(card.likes);
        })
        .catch((err) => {
          console.log("Ошибка при удалении лайка", err);
        });
    }
  }
  _setLikesCount(count) {
    this._likesCountEl.textContent = count;
  }
  _checkMyLike(likes) {
    const myLike = (el) => el._id === this._currentUser._id;
    if (likes.some(myLike)) {
      this._element
        .querySelector(".element__like")
        .classList.add("element__like_active");
    } else {
      this._element
        .querySelector(".element__like")
        .classList.remove("element__like_active");
    }
  }
  _handleDeleteCard() {
    this._deleteCard(this._card._id, this._element);
  }
  getIdCard() {
    return this._cardId;
  }
  deleteElement(event) {
    event.target.closest(".element").remove();
  }
  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".element__image");
    this._title = this._element.querySelector(".element__title");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._likesCountEl = this._element.querySelector(".element__like-count");
    this._setLikesCount(this._card.likes.length);
    this._checkMyLike(this._card.likes);
    this._setEventListeners();

    return this._element;
  }
  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleToggleLike();
      });
    this._removeBtn = this._element.querySelector(".element__trash");
    if (this._isMyCard) {
      this._removeBtn.addEventListener("click", () => this._handleDeleteCard());
    } else {
      this._removeBtn.remove();
    }
  }
}
