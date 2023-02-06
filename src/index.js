import 'modern-normalize/modern-normalize.css';
import './css/style.css'
import ImageApi from './js/api.js';
import Notiflix from "notiflix";
import LoadMoreBtn from './conponents/loadMoreBtn.js';
import { noResult,empySearch,searchSucces, endSerch } from "./conponents/message";
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css"



const refs = {
    searchForm: document.getElementById('search-form'),
    serchField: document.querySelector("[name ='searchQuery']"),
    serchBtn: document.querySelector('button'),
    gallery: document.querySelector(".gallery"),
    // loadMoreBtn: document.querySelector('.load-more')
}
const imageApi = new ImageApi()
const loadMoreBtn = new LoadMoreBtn({
    selector: ".load-more",
    isHidden: true});

const gallery = new simpleLightbox('.gallery a',{
    disableScroll: true,
    showCounter: false,
    disableRightClick: true
});
refs.serchBtn.addEventListener('click', startSearch)
loadMoreBtn.button.addEventListener('click', loadMore)

// ===========FIRST=SEARCH=FUNCTION=================
function startSearch (event) {
    event.preventDefault();
    imageApi.searchQuery = refs.serchField.value
    cleanMarkup ()
    imageApi.resetCounterPage()
    imageApi.resetLoadetHits()
    if (!imageApi.searchQuery) {
        empySearch()
        loadMoreBtn.hide()
        loadMoreBtn.disable()
        return
    } 
    imageApi.sendRequest()
    .then(({hits, totalHits}) => {
        
        if (!hits.length) {
            loadMoreBtn.hide()
            loadMoreBtn.disable()
            noResult()
            return
        } else {
            searchSucces(totalHits)
            imageApi.loadedHitsCounter(hits)
            
            if (imageApi.loadedHits < totalHits){
                loadMoreBtn.show()
                loadMoreBtn.enable()
                createGalary(hits)
            } else {
                loadMoreBtn.hide()
                loadMoreBtn.disable()
                createGalary(hits)
            } 
        } 
        gallery.refresh() 
    })
    
}
// =============LOAD=MORE=FUNCTION================
function loadMore () {
    imageApi.serchQuery = refs.serchField.value
    imageApi.sendRequest() 
    
    .then(({hits, totalHits}) => {
        imageApi.loadedHitsCounter(hits)
        
        if (totalHits === imageApi.loadedHits){
            console.log("button is hide")
            createGalary(hits)
            gallery.refresh()
            loadMoreBtn.disable()
            loadMoreBtn.hide()
            endSerch()
            return
        }   
        createGalary(hits) 
        gallery.refresh()
    })
}

// =============Markup=================

function createGalary (imgArr){
    const stringMarkup = imgArr.reduce((string, img) => createGalaryCard(img)+string,"")
    refs.gallery.insertAdjacentHTML('beforeend',stringMarkup);
}
function createGalaryCard ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
    return `
    <div class="photo-card">
    <a href=${largeImageURL}>
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${downloads}</b>
      </p>
    </div>
  </div>`
}
function cleanMarkup () {
    refs.gallery.innerHTML = ''
}

// =======================================
