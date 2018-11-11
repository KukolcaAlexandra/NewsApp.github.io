import {getNewsSources, getNews} from './services/getNews';
import {Autocomplete} from './services/autocomplete';
import {showNews} from './services/showNews';

//import {addButtonHandler} from './services/addButtonHandler';

const input = document.getElementById('myInput');
const button = document.getElementById('button');
let data = {};
let autocomplete;
//console.dir(input);
//addButtonHandler(button, input);
button.addEventListener('click', (e) => {
  //console.log(e.target);
  //alert(input.value);
  console.log(input.value);
  console.log(data);
  let sourceId = data[input.value];
  console.log(sourceId);
  getNews(data[input.value])
    .then(res => res)
    .then((res) => {
      console.log('and now you should show'); 
      showNews(res);
      //console.log(res);
    })
});

getNewsSources()
  .then(res => {
    const names = res.map(elem => elem['name']);
    //let obj = {};
    res.map(elem => { 
      let key = elem['name'];
      let value = elem['id'];
      data[key] = value;
    //  return obj;
    });
    //autocomplete(input, names);
    console.log(names);
    autocomplete = new Autocomplete(input, names);
    autocomplete.addHandlers();
    //addButtonHandler(button, input);
  })



