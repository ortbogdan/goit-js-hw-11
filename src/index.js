import {fetchGallery} from "./services/api";
import { Notify } from 'notiflix';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('[name="searchQuery"]');
const galleryRef = document.querySelector('.gallery');

formRef.addEventListener('submit', searchImages)

function searchImages (e) {
   e.preventDefault()
   const value = inputRef.value;
   console.log(value)
   const getImages =fetchGallery(value);

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
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
  </div></a>`).join('');

}
