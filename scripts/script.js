let overlay = document.querySelector(".overlay");
let popupOpenButton = document.querySelector(".profile__edit");
let popupCloseButton = document.querySelector(".edit-form__close");
let editForm = document.querySelector(".edit-form");
let popupField = document.querySelectorAll(".edit-form__input");
let profileNameField = document.querySelector(".profile__name");
let profileDescriptionField = document.querySelector(".profile__description");

function openPopup(evt) {
  evt.preventDefault();
  overlay.classList.add("overlay_shown");
  popupField[0].setAttribute('value', profileNameField.textContent);
  popupField[1].setAttribute('value', profileDescriptionField.textContent);
}

function closePopup(evt) {
  evt.preventDefault();
  overlay.classList.remove("overlay_shown");
}

function updateProfileInfo(evt) {
    evt.preventDefault();
    popupField[0].value;
    popupField[1].value;
    profileNameField.textContent = popupField[0].value;
    profileDescriptionField.textContent = popupField[1].value;
    closePopup(evt);
}

popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
editForm.addEventListener("submit", updateProfileInfo);