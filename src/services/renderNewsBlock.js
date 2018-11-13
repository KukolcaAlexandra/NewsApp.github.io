import { months }  from '../consts/months';

export const renderNewsBlock = (news) => {
  const newsContainer = document.querySelector('.news-container');
  let items = [];

  removeNewsBlocks();

  news.forEach(item => {
    const newsBlock = document.createElement('div');
    newsBlock.className = 'news-block';
    
    const titleBlock = document.createElement('div');
    titleBlock.className = 'title-block';
    
    const image = document.createElement('img');
    image.className = 'image';
    image.src = item.urlToImage;
       
    const titleDate = document.createElement('div');
    titleDate.className = 'title-date';
    const title = document.createElement('h3');
    title.className = 'title';
    title.innerHTML = item.title;

    const date = new Date(item.publishedAt);
    const displayDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    
    const dateBlock = document.createElement('div');
    dateBlock.className = 'date-block';
    dateBlock.innerHTML = displayDate;
    
    titleDate.appendChild(title);
    titleDate.appendChild(dateBlock);    

    titleBlock.appendChild(image);
    titleBlock.appendChild(titleDate);
        
    const descriptionBlock = document.createElement('div');
    descriptionBlock.className = 'description-block';

    const description = document.createElement('div');
    description.className = 'description';
    description.innerHTML = item.description;

    const linkBlock = document.createElement('div');
    linkBlock.className = 'link-block';
    const link = document.createElement('a');
    
    link.setAttribute('href', item.url);
    link.setAttribute('target', '_blank');
    link.innerHTML = 'read more';
    
    linkBlock.appendChild(link);
    
    descriptionBlock.appendChild(description);
    
    newsBlock.appendChild(titleBlock);
    newsBlock.appendChild(descriptionBlock);
    newsBlock.appendChild(linkBlock);

    items.push(newsBlock);
  });
  
  items.forEach(news => {
    newsContainer.appendChild(news);
  })
}

const removeNewsBlocks = () => {
  const newsContainer = document.querySelector('.news-container');
  const childs = [...newsContainer.children];
  
  childs.forEach(elem => {
    newsContainer.removeChild(elem);
  });
}