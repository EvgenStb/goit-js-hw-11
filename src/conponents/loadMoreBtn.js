export default class LoadMoreBtn {
    constructor ({selector, isHidden = true}){
        
        this.button = this.getButton(selector);

        isHidden && this.hide()
    }
    getButton(selector){
        return document.querySelector(selector);
    }
    hide(){
        this.button.classList.add("hidden")
    }
    show(){
        this.button.classList.remove("hidden")
    }
    enable(){
        this.button.disabled = false;
    }
    disable(){
        this.button.disable = true;
    }
}