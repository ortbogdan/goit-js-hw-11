import {fetchGallery} from "./services/api";
import { Notify } from 'notiflix';

const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('[name="searchQuery"]')
formRef.addEventListener('submit', searchImages)
console.dir(formRef)

function searchImages (e) {
   e.preventDefault()
   const value = inputRef.value;
   console.log(value)
   fetchGallery(value).then(({hits})=>{
       if (hits.length === 0) {
           return Notify.info('Sorry, there are no images matching your search query. Please try again.');
       }
    console.log(hits)

   })
}

// {webformatURL, largeImageURL, tags, likes, views, comments, downloads}