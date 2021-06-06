import("./index.css");
import {
  formData,
  cardsContainerSelector,
  cardTemplateSelector,
  profileNameFieldSelector,
  profileDescriptionFieldSelector,
  avatarSelector,
  enlargeImagePopupSelector,
  editProfilePopupSelector,
  addNewCardPopupSelector,
  avatarPopupSelector,
  confirmPopupSelector,
  editProfileBtn,
  addNewElementBtn,
  profileNamePopupInput,
  profileDescriptionPopupInput,
  editProfileForm,
  addNewCardForm,
  avatarForm,
  avatarLogo,
} from "../components/utils.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  headers: {
    authorization: "0a31321b-14cf-45a7-85c8-e512e17ec754",
    "Content-Type": "application/json",
  },
});

let currentUser;

const handleAddCard = () => {
  addNewCardPopup.open();
};

const handleEditProfile = () => {
  const { name, about } = user.getUserInfo();
  profileNamePopupInput.value = name;
  profileDescriptionPopupInput.value = about;
  editProfilePopup.open();
};

const enlargeImagePopup = new PopupWithImage(enlargeImagePopupSelector);

const confirmAction = () => {
  return new Promise((res, rej) => {
    confirmPopup.open(res, rej);
  });
};

function deleteCardWithConfirm(cardId) {
  api
    .deleteCard(cardId)
    .catch((err) => {
      console.log("Ошибка при удалении карточки", err);
    });
}

const getCard = (data) => {
  const card = new Card(
    data,
    currentUser,
    cardTemplateSelector,
    () => enlargeImagePopup.open(data.name, data.link),
    {
      handleToggleLike: function (action, cardId) {
        if (action === "PUT") {
          return api.putLike(cardId);
        } else {
          return api.deleteLike(cardId);
        }
      },
    },
    {
      handleDeleteCard: function (cardId) {
        confirmAction()
          .then(() => {
            deleteCardWithConfirm(cardId);
          })
          .then(() => {
            card.deleteElement();
          })
          .catch(() => console.log("Отмена удаления карточки"));
      },
    }
  );
  return card.generateCard();
};

const cardsSection = new Section(
  {
    renderer: (data) => getCard(data),
  },
  cardsContainerSelector
);

const user = new UserInfo({
  profileNameFieldSelector: profileNameFieldSelector,
  profileDescriptionFieldSelector: profileDescriptionFieldSelector,
  avatarSelector: avatarSelector,
});

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, {
  handleFormSubmit: function (userData) {
    this.savingData();
    api
      .setUserInfo({
        name: userData["profileName"],
        about: userData["profileDescription"],
      })
      .then((userData) => {
        user.setUserInfo(userData);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log("Ошибка при изменении данных в профиле", err);
      })
      .finally(() => {
        editProfilePopup.returnSubmitBtnInitialValue();
      });
  }
});

const addNewCardPopup = new PopupWithForm(addNewCardPopupSelector, {
  handleFormSubmit: function (card) {
    this.savingData();
    api
      .createCard({
        name: card["newCardName"],
        link: card["newCardImage"],
      })
      .then((card) => {
        cardsSection.addItem(card);
        addNewCardPopup.close();
      })
      .catch((err) => {
        console.log("Ошибка при добавлении карточки", err);
      })
      .finally(() => {
        addNewCardPopup.returnSubmitBtnInitialValue();
      });
  }
});

const avatarPopup = new PopupWithForm(avatarPopupSelector, {
  handleFormSubmit: function (userData) {
    this.savingData();
    api
      .updateAvatar(userData["newAvatar"])
      .then((userData) => {
        user.setUserAvatar(userData);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log("Ошибка при обновлении аватара", err);
      })
      .finally(() => {
        avatarPopup.returnSubmitBtnInitialValue();
      });
  },
});

const handleUpdateAvatar = () => {
  avatarPopup.open();
};

const confirmPopup = new PopupWithConfirm(confirmPopupSelector, {
  handleFormSubmit: function () {},
});

const editProfileFormValidator = new FormValidator(formData, editProfileForm);
const addNewCardFormValidator = new FormValidator(formData, addNewCardForm);
const avatarFormValidator = new FormValidator(formData, avatarForm);

enlargeImagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addNewCardPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();

editProfileFormValidator.enableValidation();
addNewCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

editProfileBtn.addEventListener("click", handleEditProfile);
addNewElementBtn.addEventListener("click", handleAddCard);
avatarLogo.addEventListener("click", handleUpdateAvatar);

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    currentUser = userData;
    user.setUserInfo(currentUser);
    user.setUserAvatar(currentUser);
    cardsSection.setItems(cards);
    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });