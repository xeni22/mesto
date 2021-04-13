export const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Архыз",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Челябинская область",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Иваново",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Камчатка",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Холмогорский район",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Байкал",
  },
];

export const formData = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: ".form__input-error",
  errorClass: "form__input-error_shown",
};

export const cardsContainerSelector = ".elements";
export const cardTemplateSelector = ".template-element";
export const profileNameFieldSelector = ".profile__name";
export const profileDescriptionFieldSelector = ".profile__description";
export const enlargeImagePopupSelector = ".popup_type_enlarge-image";
export const editProfilePopupSelector = ".popup_type_edit-profile";
export const addNewCardPopupSelector = ".popup_type_add-new-card";
export const editProfileBtn = document.querySelector(".profile__edit");
export const addNewElementBtn = document.querySelector(".profile__add");
export const editProfilePopup = document.querySelector(editProfilePopupSelector);
export const editProfileForm = editProfilePopup.querySelector(".form");
export const profileNamePopupInput = document.getElementById("profileName"); 
export const profileDescriptionPopupInput = document.getElementById("profileDescription");
export const addNewCardPopup = document.querySelector(addNewCardPopupSelector);
export const addNewCardForm = addNewCardPopup.querySelector('.form');