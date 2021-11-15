import {fetchGallery} from "./services/api";
import { Notify } from 'notiflix';

const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('[name="searchQuery"]');
const galleryRef = document.querySelector('.gallery');

formRef.addEventListener('submit', searchImages)
console.dir(formRef)

async function searchImages (e) {
   e.preventDefault()
   const value = inputRef.value;
   console.log(value)
   const getImages = await fetchGallery(value)
   getImages.then((data)=>{
      
       if (data.hits.length === 0) {
           return Notify.info('Sorry, there are no images matching your search query. Please try again.');
       }
       console.log(data.hits)
    const imagesCards = makeCardMarkup(data.hits);
    galleryRef.insertAdjacentHTML('beforeend', imagesCards)
   })
}
// {webformatURL, tags, likes, views, comments, downloads}
// {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
function makeCardMarkup (images) {
   return images.map(({webformatURL, tags, likes, views, comments, downloads}) =>`<div class="photo-card">
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
  </div>`).join('');

}