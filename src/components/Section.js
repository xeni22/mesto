export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  setItems(items) {
    this._items = items;
  }
  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
  _clear() {
    this._container.innerHTML = "";
  }
  renderItems(items) {
    this._clear();
    items.forEach((item) => {
      this.addItem(item);
    });
  }
}
