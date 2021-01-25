let overlay = document.querySelector(".overlay");
let popupOpenButton = document.querySelector(".profile__edit");
let popupCloseButton = document.querySelector(".edit-form__close");
let editForm = document.querySelector(".edit-form");
let popupNameField = document.querySelector(".edit-form__name");
let popupDescriptionField = document.querySelector(".edit-form__description");
let profileNameField = document.querySelector(".profile__name");
let profileDescriptionField = document.querySelector(".profile__description");

function togglePopup(evt) {
  evt.preventDefault();
  overlay.classList.toggle("overlay_hidden");
}
popupOpenButton.addEventListener("click", togglePopup);
popupCloseButton.addEventListener("click", togglePopup);

function updateProfileInfo(evt) {
    evt.preventDefault();
    popupNameField.value;
    popupDescriptionField.value;
    profileNameField.textContent = popupNameField.value;
    profileDescriptionField.textContent = popupDescriptionField.value;
}
editForm.addEventListener("submit", updateProfileInfo);
editForm.addEventListener("submit", togglePopup);