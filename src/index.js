import {fetchGallery} from "./services/api";
import { Notify } from 'notiflix';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('[name="searchQuery"]');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let value = '';
formRef.addEventListener('submit', searchImages)
loadMoreBtn.addEventListener('click', addMoreImages);

async function addMoreImages() {
  console.log('dasdasd')
  const getMoreImages = fetchGallery(value);
  getMoreImages.then((data)=>{
       if (data.hits.length === 0) {
           return Notify.info('Sorry, there are no images matching your search query. Please try again.');
       }
       console.log(data.hits)

    const imagesCards = makeCardMarkup(data.hits);
    galleryRef.insertAdjacentHTML('beforeend', imagesCards)
    
  })
  
}

function searchImages (event) {
  event.preventDefault()
  value = inputRef.value.trim();
  if (value === '') {
    return
  }
   console.log(value)
   const getImages = fetchGallery(value);

   getImages.then((data)=>{
       if (data.hits.length === 0) {
           return Notify.info('Sorry, there are no images matching your search query. Please try again.');
       }
       console.log(data.hits)

    const imagesCards = makeCardMarkup(data.hits);
    galleryRef.insertAdjacentHTML('beforeend', imagesCards)
    new SimpleLightbox('.gallery a');
    Notify.info(`Hooray! We found ${data.totalHits} images.`)
   })
}
// {webformatURL, tags, likes, views, comments, downloads}
// {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
function makeCardMarkup (images) {
   return images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
   `<a class="link" href="${largeImageURL}">
   <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="info-value">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="info-value">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="info-value">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="info-value">${downloads}</span>
    </p>
  </div>
  </div></a>`).join('');
}
