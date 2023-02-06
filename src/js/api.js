import axios from 'axios';
const BASE_URL = "https://pixabay.com/api/"
const API_KEY = "33318346-5c821774d449e8ad1afbe9b17"



export default class ImageApi {
    constructor (){
        this.queryPage = 1;
        this.searchQuery = "";
        this.loadedHits = 0
    }
    async sendRequest() { 
        const searchParam = new URLSearchParams({
            key: API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 40,
            page: this.queryPage
        })
        const url = `${BASE_URL}?${searchParam}`
        try {
            const reqToServer = await axios.get(url);
            this.incrementPage();
            return reqToServer.data
        } catch (error) {
            console.log(`${error}`)
        }
    }
    resetCounterPage (){
        this.queryPage = 1;
    }
    incrementPage (){
        this.queryPage += 1;
    }
    resetLoadetHits(){
        this.loadedHits = 0
    }
    loadedHitsCounter(hits){
        this.loadedHits += hits.length
    }
}
