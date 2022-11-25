import { showHomeView } from "./home.js";

document.querySelector('a').addEventListener('click', navClick);

function navClick(event){
    event.preventDefault();

    showHomeView();
}