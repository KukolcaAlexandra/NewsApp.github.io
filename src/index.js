import { getNewsSources, getNews } from './services/newsLoader';
import { Autocomplete } from './services/autocomplete';
import { addButtonHandler } from './services/buttonHandler';
import { getSourceNames, getSourceNamesWithId } from './services/getSourceNames';

const input = document.getElementById('myInput');
const button = document.getElementById('button');

getNewsSources()
  .then(res => {
    let autocomplete = new Autocomplete(input, getSourceNames(res));
    autocomplete.addHandlers();
    addButtonHandler(button, getSourceNamesWithId(res), input);
  })
