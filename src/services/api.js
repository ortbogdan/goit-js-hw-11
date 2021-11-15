
const URL = 'https://pixabay.com/api/'
const API_KEY = '24332331-fceed411956b076254def86c5'
let page = 1;

function fetchGallery (name) {
 return fetch (`${URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`).then((response)=>{
if (!response.ok) {
    throw console.log("Opps")
}
return response.json();
    })
}
export {fetchGallery}
// {webformatURL, largeImageURL, tags, likes, views, comments, downloads}