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
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector(".template-element");
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

const enlargeImagePopup = document.querySelector(".popup_type_enlarge-image");
const image = enlargeImagePopup.querySelector(".popup__image");
const figcaption = enlargeImagePopup.querySelector(".popup__caption");

const closeEditProfilePopupBtn = document.getElementById("closeEditProfilePopup");
const closeNewCardPopupBtn = document.getElementById("closeNewCardPopup");
const closeImagePopupBtn = document.getElementById("closeImagePopup");

function render() {
  cardsContainer.append(...initialCards.map(createCards));
}
function createCards(item) {
  const element = cardTemplate.content.cloneNode(true);
  const elementTitle = element.querySelector(".element__title");
  const elementImage = element.querySelector(".element__image");
  const likeElementBtn = element.querySelector(".element__like");
  const deleteElementBtn = element.querySelector(".element__trash");
  elementTitle.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.alt;
  deleteElementBtn.addEventListener("click", deleteElement);
  likeElementBtn.addEventListener("click", likeElement);
  elementImage.addEventListener("click", openImage);
  return element;
}
function openPopup(item) {
  item.classList.add("popup_shown");
  document.addEventListener('keydown', closeByEscape); 
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
  cardsContainer.prepend(
    createCards({
      name: newCardNameInput.value,
      link: newCardImageInput.value,
      alt: newCardNameInput.value,
    })
  );
  closePopup(addNewCardPopup);
  addNewElementForm.reset();
}
function openImage(event) {
  openPopup(enlargeImagePopup);
  figcaption.textContent = event.target.alt;
  image.src = event.target.src;
  image.alt = event.target.alt;
}
function closePopup(item) {
  item.classList.remove("popup_shown");
  document.removeEventListener('keydown', closeByEscape); 
}

function closeByEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_shown')
    closePopup(openedPopup);
  }
}

function likeElement(item) {
  item.target.classList.toggle("element__like_active");
}
function deleteElement(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest(".element");
  targetItem.remove();
}

popups.forEach((item) => {
  item.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup_shown')) {
      closePopup(item);
    } if (event.target.classList.contains('popup__close')) {
      closePopup(item);
    }
  })
})

render();
editProfileBtn.addEventListener("click", openPopupEditProfile);
editProfileForm.addEventListener("submit", updateProfileInfo);
addNewElementBtn.addEventListener("click", openPopupAddNewElement);
addNewElementForm.addEventListener("submit", addNewElement);