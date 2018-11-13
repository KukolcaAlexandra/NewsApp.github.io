import { getNews } from './newsLoader';
import { renderNewsBlock } from './renderNewsBlock';

export const addButtonHandler = (button, data, input) => {
  button.addEventListener('click', (e) => {
    getNews(data.get(input.value))
      .then(res => res)
      .then((res) => {
        renderNewsBlock(res);
      })
  });
}  