let overlay = document.querySelector(".overlay");
let popupOpenButton = document.querySelector(".profile__edit");
let popupCloseButton = document.querySelector(".overlay__close");
let form = overlay.querySelector(".form");
let popupFieldName = document.getElementById("profileName");
let popupFieldeDescription = document.getElementById("profileDescription");
let profileNameField = document.querySelector(".profile__name");
let profileDescriptionField = document.querySelector(".profile__description");

function openPopup(evt) {
  evt.preventDefault();
  overlay.classList.add("overlay_shown");
  popupFieldName.value = profileNameField.textContent;
  popupFieldeDescription.value = profileDescriptionField.textContent;
}

function closePopup(evt) {
  evt.preventDefault();
  overlay.classList.remove("overlay_shown");
}

function updateProfileInfo(evt) {
  evt.preventDefault();
  profileNameField.textContent = popupFieldName.value;
  profileDescriptionField.textContent = popupFieldeDescription.value;
  closePopup(evt);
}

popupOpenButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
form.addEventListener("submit", updateProfileInfo);