export default class UserInfo {
  constructor({profileNameFieldSelector, profileDescriptionFieldSelector}) {
    this._name = document.querySelector(profileNameFieldSelector);
    this._description = document.querySelector(profileDescriptionFieldSelector);
  }
  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      description: this._description.textContent
    }
    return userData;
  }
  setUserInfo({name, description}) {
    this._name.textContent =  name;
    this._description.textContent = description;
  }
}