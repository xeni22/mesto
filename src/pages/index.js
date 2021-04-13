import("./index.css");
import {
  initialCards,
  formData,
  cardsContainerSelector,
  cardTemplateSelector,
  profileNameFieldSelector,
  profileDescriptionFieldSelector,
  enlargeImagePopupSelector,
  editProfilePopupSelector,
  addNewCardPopupSelector,
  editProfileBtn,
  addNewElementBtn,
  profileNamePopupInput,
  profileDescriptionPopupInput,
  editProfileForm,
  addNewCardForm
} from "../components/utils.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";

const handleAddCard = () => {
  addNewCardPopup.open();
};

const handleEditProfile = () => {
  const { name, description } = user.getUserInfo();
  profileNamePopupInput.value = name;
  profileDescriptionPopupInput.value = description;
  editProfilePopup.open();
};

const enlargeImagePopup = new PopupWithImage(enlargeImagePopupSelector);

const getCard = (data) => {
  const card = new Card(
    data,
    () => enlargeImagePopup.open(data.name, data.link),
    cardTemplateSelector
  );
  return card.generateCard();
};

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardsSection.addItem(getCard(data));
    },
  },
  cardsContainerSelector
);

const user = new UserInfo({
  profileNameFieldSelector: profileNameFieldSelector,
  profileDescriptionFieldSelector: profileDescriptionFieldSelector,
});

const profileSubmitHandler = (data) => {
  user.setUserInfo({
    name: data["profileName"],
    description: data["profileDescription"],
  });
  editProfilePopup.close();
};

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, (data) =>
  profileSubmitHandler(data)
);

const addCardSubmitHandler = (data) => {
  const name = data["newCardName"];
  const link = data["newCardImage"];
  cardsSection.addItem(getCard({ name, link }));
  addNewCardPopup.close();
};

const addNewCardPopup = new PopupWithForm(addNewCardPopupSelector, (data) =>
  addCardSubmitHandler(data)
);

const editProfileFormValidator = new FormValidator(formData, editProfileForm);
const addNewCardFormValidator = new FormValidator(formData, addNewCardForm);

enlargeImagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addNewCardPopup.setEventListeners();

editProfileFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();

editProfileBtn.addEventListener("click", handleEditProfile);
addNewElementBtn.addEventListener("click", handleAddCard);

cardsSection.renderItems();