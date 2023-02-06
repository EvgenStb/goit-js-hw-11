import Notiflix from "notiflix";

function noResult() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}

function empySearch(){
    Notiflix.Notify.warning("Enter the search query!")
}

function searchSucces(totalHits){
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
}
function endSerch(){
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
}

export {noResult,empySearch,searchSucces, endSerch}