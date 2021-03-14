import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popups = document.querySelectorAll(".popup");

const editProfileBtn = document.querySelector(".profile__edit");
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const editProfileForm = document.getElementById("editProfile");
const profileNamePopupInput = document.getElementById("profileName");
const profileDescriptionPopupInput = document.getElementById(
  "profileDescription"
);
const profileNameField = document.querySelector(".profile__name");
const profileDescriptionField = document.querySelector(".profile__description");

const addNewElementBtn = document.querySelector(".profile__add");
const addNewCardPopup = document.querySelector(".popup_type_add-new-card");
const addNewElementForm = document.getElementById("addNewElement");
const newCardNameInput = document.getElementById("newCardName");
const newCardImageInput = document.getElementById("newCardImage");

const initialCards = [
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
const formData = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_shown'
}

initialCards.forEach((item) => {
  const card = new Card(item, ".template-element");
  const cardList = document.querySelector(".elements");
  const cardElement = card.generateCard();
  cardList.append(cardElement);
});
function openPopup(item) {
  item.classList.add("popup_shown");
  document.addEventListener("keydown", closeByEscape);
}
function openPopupEditProfile() {
  openPopup(editProfilePopup);
  profileNamePopupInput.value = profileNameField.textContent;
  profileDescriptionPopupInput.value = profileDescriptionField.textContent;
}
function updateProfileInfo(event) {
  event.preventDefault();
  profileNameField.textContent = profileNamePopupInput.value;
  profileDescriptionField.textContent = profileDescriptionPopupInput.value;
  closePopup(editProfilePopup);
}
function openPopupAddNewElement() {
  openPopup(addNewCardPopup);
}
function addNewElement(event) {
  event.preventDefault();
  const data = {
    name: newCardNameInput.value,
    link: newCardImageInput.value,
    alt: newCardNameInput.value,
  };
  const card = new Card(data, ".template-element");
  const cardList = document.querySelector(".elements");
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
  closePopup(addNewCardPopup);
  addNewElementForm.reset();
}
function closePopup(item) {
  item.classList.remove("popup_shown");
  document.removeEventListener("keydown", closeByEscape);
}
export function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_shown");
    closePopup(openedPopup);
  }
}
popups.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup_shown")) {
      closePopup(item);
    }
    if (event.target.classList.contains("popup__close")) {
      closePopup(item);
    }
  });
});

const editProfileFormValidator = new FormValidator(formData, editProfileForm);
editProfileFormValidator.enableValidation();

const addNewElementFormValidator = new FormValidator(formData, addNewElementForm);
addNewElementFormValidator.enableValidation();

editProfileBtn.addEventListener("click", openPopupEditProfile);
editProfileForm.addEventListener("submit", updateProfileInfo);
addNewElementBtn.addEventListener("click", openPopupAddNewElement);
addNewElementForm.addEventListener("submit", addNewElement);
