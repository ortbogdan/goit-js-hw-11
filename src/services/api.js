import axios from "axios";


axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '24332331-fceed411956b076254def86c5'
let perPage = 40;
let page = 1;

function fetchGallery(name) {
    return axios.get(`/?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`).then(response => { page += 1; return response.data }).catch(console.log);
    }
export {fetchGallery}
// {webformatURL, largeImageURL, tags, likes, views, comments, downloads}
// ====================================================================================
// class ImageApi {
//     constructor() {
//         this.searchImage = '';
//         this.page = 1;
//     }
//     fetchImages(name) {
//         axios.defaults.baseURL = 'https://pixabay.com/api';
//         const key = '24332331-fceed411956b076254def86c5'
//         return axios.get(`/?key=${key}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`).then(response =>  return response.data).catch(console.log);
//     }
//     incrementPage() {
//         this.page += 1;
//     }
//     resetPage() {
//         this.page = 1;
//     }
//     get img() {
//         return this.searchImage;
//     }
//     set img(newImage) {
//         this.searchImage = newImage;
//     }
// }