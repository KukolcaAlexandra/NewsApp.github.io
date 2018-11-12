export const showNews = (news) => {
  const newsContainer = document.querySelector('.news-container');
  let items = [];

  deleteNews();

  news.forEach(item => {
    const newsBlock = document.createElement('div');
    newsBlock.className = 'news-block';
    
    const titleBlock = document.createElement('div');
    titleBlock.className = 'title-block';
    
    const image = document.createElement('img');
    image.className = 'image';
    image.src = item.urlToImage;
        
    const title = document.createElement('h3');
    title.className = 'title';
    title.innerHTML = item.title;

    const date = new Date(item.publishedAt);
    const displayDate = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
    console.log(displayDate);
    titleBlock.appendChild(image);
    titleBlock.appendChild(title);
    
    const descriptionBlock = document.createElement('div');

    const description = document.createElement('div');
    description.className = 'description';
    description.innerHTML = item.description;

    const linkBlock = document.createElement('div');
    
    const link = document.createElement('a');
    link.setAttribute('href', item.url);
    link.setAttribute('target', '_blank');
    link.innerHTML = 'read more';
    
    linkBlock.appendChild(link);
    //link.href = item.url;

    descriptionBlock.appendChild(description);
    //descriptionBlock.appendChild(link);
    descriptionBlock.appendChild(linkBlock);

    newsBlock.appendChild(titleBlock);
    newsBlock.appendChild(descriptionBlock);

    items.push(newsBlock);
  });
  
  items.forEach(news => {
    newsContainer.appendChild(news);
  })
  console.log(newsContainer);
}

const deleteNews = () => {
  const newsContainer = document.querySelector('.news-container');
  const childs = [...newsContainer.children];
  
  childs.forEach(elem => {
    newsContainer.removeChild(elem);
  });
}