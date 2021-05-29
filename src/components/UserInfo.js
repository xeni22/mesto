export default class UserInfo {
  constructor({profileNameFieldSelector, profileDescriptionFieldSelector, avatarSelector}) {
    this._name = document.querySelector(profileNameFieldSelector);
    this._about = document.querySelector(profileDescriptionFieldSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._about.textContent
    }
    return userData;
  }
  setUserInfo({name, about}) {
    this._name.textContent =  name;
    this._about.textContent = about;
  }
  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}