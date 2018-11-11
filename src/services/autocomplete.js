export class Autocomplete {
  constructor (input, data) {
    this.input = input;
    this.data = data;
    this.currentFocus = null;
    this.closeAllLists =  this.closeAllLists.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);
  }

  addHandlers() {
    this.input.addEventListener('input', this.inputHandler);
    this.input.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('click', this.clickHandler);
  }

  addActive(item) {
    if (!item) return false;
    this.removeActive(item);
    if (this.currentFocus >= item.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (item.length - 1);
    item[this.currentFocus].classList.add('autocomplete-active');
  }

  removeActive(item) {
    for (let i = 0; i < item.length; i++) {
      item[i].classList.remove('autocomplete-active');
    }
  }

  closeAllLists(element) {
    let item = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < item.length; i++) {
      if (element != item[i] && element != this.input) {
        item[i].parentNode.removeChild(item[i]);
      }
    }
  }

  inputHandler(e) {
    let itemContainer;
    let item;
    let val = this.input.value;
    this.closeAllLists();
    if (!val) { return false;}
    this.currentFocus = -1;
    itemContainer = document.createElement('div');
    itemContainer.setAttribute('id', `${this.input.id}autocomplete-list`);
    itemContainer.setAttribute('class', 'autocomplete-items');
    this.input.parentNode.appendChild(itemContainer);
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        item = document.createElement('div');
        item.innerHTML = `<strong>${this.data[i].substr(0, val.length)}</strong>`;
        item.innerHTML += this.data[i].substr(val.length);
        item.innerHTML += `<input type='hidden' value='${this.data[i]}'>`;
        item.addEventListener('click', (e) => {
          this.input.value = e.target.getElementsByTagName('input')[0].value;
          this.closeAllLists();
        });
        itemContainer.appendChild(item);
      }
    }
  }

  keydownHandler(e) {
    let item = document.getElementById(`${this.input.id}autocomplete-list`);
    if (item) item = item.getElementsByTagName('div');
    if (e.keyCode == 40) {
      this.currentFocus++;
      this.addActive(item);
    } else if (e.keyCode == 38) { 
      this.currentFocus--;
      this.addActive(item);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (this.currentFocus > -1) {
        if (item) item[this.currentFocus].click();
      }
    }
  }

  clickHandler(e) {
    this.closeAllLists(e.target);
  }
}
