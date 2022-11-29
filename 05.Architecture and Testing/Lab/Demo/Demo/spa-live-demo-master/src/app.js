import { checkUserNav, onLogout } from './auth.js';
import { showHomeView } from './home.js';
import { showCatalogView } from './catalog.js';
import { showLoginView } from './login.js';
import { showRegisterView } from './register.js';
import './details.js';

document.querySelector('nav').addEventListener('click', onNavigate);



const views = {
        "home-link" : showHomeView,
        "catalog-link" : showCatalogView,
        "login-link" : showLoginView,
        "register-link": showRegisterView,
        "logout-link" : onLogout,
};

checkUserNav();

// Start application in home view
showHomeView();


function onNavigate(event){
    if(event.target.tagName == 'A'){
        const id = event.target.id;
        const view = views[id];

        if (typeof view == 'function'){
            event.preventDefault();
            document.querySelector('main').replaceChildren();
            view();
        }
    }
}