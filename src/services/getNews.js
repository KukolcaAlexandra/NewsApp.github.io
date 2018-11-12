import {apiKey} from '../settings';

export const getNewsSources = () => {
  const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => responseJson.sources)
}

export const getNews = (source) => {
  const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
  //console.log('getNews');
  //const url = `https://newsapi.org/v2/sources?apiKey=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => responseJson.articles)
}
