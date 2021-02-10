const overlay = document.querySelector('.overlay');
const editProfileBtn = document.querySelector('.profile__edit');
const addNewElementBtn = document.querySelector('.profile__add');
const closePopupBth = document.querySelector('.overlay__close');


const editProfileForm = document.getElementById('editProfile');
const addNewElementForm = document.getElementById('addNewElement');

const popup = document.querySelector('.overlay__popup');

const profileNamePopupInput = document.getElementById('profileName');
const profileNameField = document.querySelector('.profile__name');
const profileDescriptionPopupInput = document.getElementById('profileDescription');
const profileDescriptionField = document.querySelector('.profile__description');

const elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('.template-element');
const newElementNameInput = document.getElementById('elementName');
const newElementImageInput = document.getElementById('elementImage');


const initialCards = [
  {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', alt: 'Архыз'},
  {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', alt: 'Челябинская область'},
  {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', alt: 'Иваново'},
  {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', alt: 'Камчатка'},
  {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', alt: 'Холмогорский район'},
  {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', alt: 'Байкал'}
];

function render() {
  elementsContainer.append(...initialCards.map(getElements));
}
function getElements(item) {
  const element = elementTemplate.content.cloneNode(true);
  const elementTitle = element.querySelector('.element__title');
  const elementImage = element.querySelector('.element__image');
  const likeElementBtn = element.querySelector('.element__like');
  const deleteElementBtn = element.querySelector('.element__trash');
  elementTitle.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.alt;
  deleteElementBtn.addEventListener('click', deleteElement);
  likeElementBtn.addEventListener('click', likeElement);
  elementImage.addEventListener('click', openImage);
  return element;
}
function openImage(event) {
  const figure = document.querySelector('.overlay__figure');
  const image = figure.querySelector('.overlay__image');
  const figcaption = figure.querySelector('.overlay__caption');
  overlay.classList.add('overlay_shown');
  popup.classList.add('overlay__popup_image');
  figure.classList.add('overlay__figure_shown');
  figcaption.textContent = event.target.alt;
  image.src = event.target.src;
  image.alt = event.target.alt;
  overlay.style.background = 'rgba(0, 0, 0, .9)';
}
function deleteElement(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.element');
  targetItem.remove();
}
function openPopupEditProfile(evt) {
  evt.preventDefault();
  overlay.classList.add('overlay_shown');
  editProfileForm.classList.add('form_shown');
  profileNamePopupInput.value = profileNameField.textContent;
  profileDescriptionPopupInput.value = profileDescriptionField.textContent;
}
function updateProfileInfo(evt) {
  evt.preventDefault();
  profileNameField.textContent = profileNamePopupInput.value;
  profileDescriptionField.textContent = profileDescriptionPopupInput.value;
  closePopup(evt);
}
function openPopupAddNewElement(evt) {
  evt.preventDefault();
  addNewElementForm.reset()
  overlay.classList.add('overlay_shown');
  addNewElementForm.classList.add('form_shown');
  popup.classList.remove('overlay__popup_image');
}
function addNewElement(evt) {
  evt.preventDefault();
  elementsContainer.prepend(getElements({name: newElementNameInput.value, link: newElementImageInput.value, alt: newElementNameInput.value}));
  closePopup(evt);
}
function likeElement(item) {
  item.target.classList.toggle('element__like_active');
}
function deleteElement(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.element');
  targetItem.remove();
}
function closePopup(evt) {
  evt.preventDefault();
  overlay.classList.remove('overlay_shown');
  editProfileForm.classList.remove('form_shown');
  addNewElementForm.classList.remove('form_shown');
  document.querySelector('.overlay__figure').classList.remove('overlay__figure_shown');
  popup.classList.remove('overlay__popup_image');
  overlay.style.background = 'rgba(0, 0, 0, .5)';
}

render();
editProfileBtn.addEventListener('click', openPopupEditProfile);
closePopupBth.addEventListener('click', closePopup);
editProfileForm.addEventListener('submit', updateProfileInfo);
addNewElementBtn.addEventListener('click', openPopupAddNewElement);
addNewElementForm.addEventListener('submit', addNewElement);