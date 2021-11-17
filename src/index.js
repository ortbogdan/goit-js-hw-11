import { ImagesApi } from "./services/api";
import { makeCardMarkup } from "./services/makeCardMarkup";
import { Notify } from 'notiflix';
import { throttle } from "lodash";

import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.load-more');

const imageApi = new ImagesApi();
const simpleLightbox = new SimpleLightbox('.gallery a');

formRef.addEventListener('submit', searchImages);

function searchImages(event) {
  event.preventDefault();
  clearImagesGallery()
  imageApi.search = event.currentTarget.elements.searchQuery.value.trim();
  if (imageApi.search === '') {
    return;
  }
  imageApi.resetPage();
  const searchImages = imageApi.fetchImages();
  searchImages.then(data=>{
       if (data.hits.length === 0) {
           return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
     }
    const imagesCards = makeCardMarkup(data.hits);
    addCardMarkup(imagesCards)
     if (data.totalHits > imageApi.perPage) {
       loadMoreBtnRef.classList.remove('visually-hidden');
       loadMoreBtnRef.addEventListener('click', throttle(loadMoreImages, 300));
     }
    Notify.info(`Hooray! We found ${data.totalHits} images.`)
   })
}
function loadMoreImages() {
  const searchImages = imageApi.fetchImages()
  searchImages.then(data => {
    const imagesCards = makeCardMarkup(data.hits);
    addCardMarkup(imagesCards);
    addGalleryScroll();
    if (data.totalHits === galleryRef.children.length) {
      loadMoreBtnRef.classList.add('visually-hidden')
      loadMoreBtnRef.removeEventListener('click', loadMoreImages);
      Notify.info('Oops...it seems that we are out of pictures!'); 
     }
  })
}
function addCardMarkup(markup) {
  galleryRef.insertAdjacentHTML('beforeend', markup)
  simpleLightbox.refresh();
}
function clearImagesGallery() {
  galleryRef.innerHTML = "";
}
function addGalleryScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

     window.scrollBy({
     top: cardHeight * 2,
     behavior: 'smooth',
    });
}
