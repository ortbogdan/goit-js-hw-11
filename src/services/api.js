import axios from "axios";

const API_KEY = '24332331-fceed411956b076254def86c5';

export class ImagesApi {
    constructor() {
        this.searchImages = '';
        this.page = 1;
        this.perPage = 40;
    }
    async fetchImages() {
        try {
            axios.defaults.baseURL = 'https://pixabay.com/api';
            const response = await axios.get(`/?key=${API_KEY}&q=${this.searchImages}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`)
            const data  = await response.data
            this.incrementPage();
            return data;
        }
        catch (e) {
            console.log(e);
        }
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get search() {
        return this.searchImages;
    }
    set search(newSearchImages) {
        this.searchImages = newSearchImages;
    }
}
