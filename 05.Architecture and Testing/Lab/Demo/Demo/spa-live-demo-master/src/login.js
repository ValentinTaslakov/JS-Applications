// register event listeners to navigation
// switch view
// handle form submit
// send login information to REST service
// store authorization token

import { post } from './api.js';
import { checkUserNav } from './auth.js';
import { showCatalogView } from './catalog.js';
import { createSubmitHandler, setUserData } from './util.js';

createSubmitHandler('login-form', onLogin);

const section = document.getElementById('login-view');
section.remove();

export function showLoginView() {

    document.querySelector('main').appendChild(section);
}

async function onLogin( { email, password } ) {
        const userData = await post('/users/login', {email, password});
        setUserData(userData);

        checkUserNav();
        showCatalogView();
    
}

