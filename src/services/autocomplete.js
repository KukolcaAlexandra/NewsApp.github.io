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

  addActive(elem) {
    if (!elem) return false;
    this.removeActive(elem);
    if (this.currentFocus >= elem.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (elem.length - 1);
    elem[this.currentFocus].classList.add('autocomplete-active');
  }

  removeActive(elem) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].classList.remove('autocomplete-active');
    }
  }

  closeAllLists(currentElement) {
    let elem = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < elem.length; i++) {
      if (currentElement != elem[i] && currentElement != this.input) {
        elem[i].parentNode.removeChild(elem[i]);
      }
    }
  }

  inputHandler(e) {
    let elemContainer;
    let elem;
    let input = e.target;
    let value = input.value;
    
    this.closeAllLists();
    
    if (!value) { 
      return false;
    }
    
    this.currentFocus = -1;
    elemContainer = document.createElement('div');
    elemContainer.setAttribute('id', `${input.id}autocomplete-list`);
    elemContainer.setAttribute('class', 'autocomplete-items');
    input.parentNode.appendChild(elemContainer);
    
    this.data.forEach(dataItem => {
      if (dataItem.substr(0, value.length).toUpperCase() === value.toUpperCase()) {
        elem = document.createElement('div');
        elem.innerHTML = `<strong>${dataItem.substr(0, value.length)}</strong>` +
                         `${dataItem.substr(value.length)}<input type='hidden' value='${dataItem}'>`;
        elem.addEventListener('click', (e) => {
          input.value = e.target.getElementsByTagName('input')[0].value;
          this.closeAllLists();
        });
        elemContainer.appendChild(elem);
      }
    });
  }

  keydownHandler(e) {
    let input = e.target;
    let elem = document.getElementById(`${input.id}autocomplete-list`);
    
    if (elem) elem = elem.getElementsByTagName('div');

    if (e.keyCode == 40) {
      this.currentFocus++;
      this.addActive(elem);
    } else {
      if (e.keyCode == 38) { 
        this.currentFocus--;
        this.addActive(elem);
      } else {
        if (e.keyCode == 13) {
          e.preventDefault();
          if (this.currentFocus > -1) {
            if (elem) elem[this.currentFocus].click();
          }
        }
      }
    }
  }

  clickHandler(e) {
    this.closeAllLists(e.target);
  }
}
