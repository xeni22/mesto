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
export const avatarSelector = ".profile__avatar";

export const avatarPopupSelector = ".popup_type_edit-avatar";
export const editProfilePopupSelector = ".popup_type_edit-profile";
export const addNewCardPopupSelector = ".popup_type_add-new-card";
export const enlargeImagePopupSelector = ".popup_type_enlarge-image";
export const confirmPopupSelector = ".popup_type_confirm";

export const editProfileBtn = document.querySelector(".profile__edit");
export const addNewElementBtn = document.querySelector(".profile__add");
export const editProfilePopup = document.querySelector(
  editProfilePopupSelector
);
export const editProfileForm = editProfilePopup.querySelector(".form");
export const profileNamePopupInput = document.getElementById("profileName");
export const profileDescriptionPopupInput =
  document.getElementById("profileDescription");
export const addNewCardPopup = document.querySelector(addNewCardPopupSelector);
export const addNewCardForm = addNewCardPopup.querySelector(".form");
export const avatarPopup = document.querySelector(avatarPopupSelector);
export const avatarForm = avatarPopup.querySelector(".form");
export const avatarLogo = document.querySelector(".profile__avatar-wrapper");
export const confirmPopup = document.querySelector(confirmPopupSelector);
