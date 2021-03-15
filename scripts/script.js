import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

const popups = document.querySelectorAll(".popup");

const editProfileBtn = document.querySelector(".profile__edit");
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const editProfileForm = document.getElementById("editProfile");
const profileNamePopupInput = document.getElementById("profileName");
const profileDescriptionPopupInput = document.getElementById("profileDescription");
const profileNameField = document.querySelector(".profile__name");
const profileDescriptionField = document.querySelector(".profile__description");

const addNewElementBtn = document.querySelector(".profile__add");
const addNewCardPopup = document.querySelector(".popup_type_add-new-card");
const addNewElementForm = document.getElementById("addNewElement");
const newCardNameInput = document.getElementById("newCardName");
const newCardImageInput = document.getElementById("newCardImage");

const enlargeImagePopup = document.querySelector(".popup_type_enlarge-image");
const image = enlargeImagePopup.querySelector(".popup__image");
const figcaption = enlargeImagePopup.querySelector(".popup__caption");

const cardList = document.querySelector(".elements");

const formData = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save",
  inactiveButtonClass: "form__save_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_shown",
};

const editProfileFormValidator = new FormValidator(formData, editProfileForm);
const addNewElementFormValidator = new FormValidator(formData,addNewElementForm);

initialCards.forEach((data) => {
  const card = new Card(data, ".template-element", openImage);
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
  };
  const card = new Card(data, ".template-element", openImage);
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
  closePopup(addNewCardPopup);
  addNewElementForm.reset();
  addNewElementFormValidator.toggleButtonState();
}
function openImage(name, link) {
  openPopup(enlargeImagePopup);
  figcaption.textContent = event.target.alt;
  image.src = event.target.src;
  image.alt = event.target.alt;
}
function closePopup(item) {
  item.classList.remove("popup_shown");
  document.removeEventListener("keydown", closeByEscape);
}
function closeByEscape(event) {
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

editProfileFormValidator.enableValidation();
addNewElementFormValidator.enableValidation();

editProfileBtn.addEventListener("click", openPopupEditProfile);
editProfileForm.addEventListener("submit", updateProfileInfo);
addNewElementBtn.addEventListener("click", openPopupAddNewElement);
addNewElementForm.addEventListener("submit", addNewElement);
