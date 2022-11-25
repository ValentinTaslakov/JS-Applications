// register event listener to navigation
// switch view
//handle form submit
// send login information to REST service

import { checkUserNav } from "./auth.js";
import { showCatalogView } from "./catalog.js";

// store authorization token
const url = 'http://localhost:3030/users/login';
document.getElementById('login-link').addEventListener('click', showLoginView);
document.getElementById('login-form').addEventListener('submit', onLogin);
    //добавям листенер към формата за логване

function showLoginView() {
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
    document.getElementById('login-view').style.display = 'block';
}

async function onLogin(event){
    event.preventDefault();
        //задължително при submit
    const formData = new FormData(event.target);
    const { email, password} = Object.fromEntries(formData);
        //деструктурираме данните от формата в обект
        //като сме задали имена на полетата в обекта да са същите като 
        //name на полетата в формата, така стойностите ще се вземат директно от полетата
    
    try{
        await postLogin(email, password);
        checkUserNav();
        showCatalogView();
            //след като се е логнал потребителя зареждаме рецептите
            //трябва да се внимава с инпортването на модулите за да не се получи кръгова
            //зависимост, за момента до тук няма такава опасност
    } catch (error) {
        alert(error.message);
    }
}

async function postLogin(email, password){
    
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok != true){
            const error = await response.json();
            throw new Error(error.message);
        }
            // на всяка заявка трябва да хващаме грешките тук проверяваме дали
            //отговора е както трябва с полето 'ок' ако е true значи имаме отговор
            //от сървиса, може да се провери и със статус различен от 200
            // и самото хващане ще е в предната функция възможно най-близо до потребителя

        const data = await response.json();
            //щом е наред трябва да вземем токена от отговора и да го запазим
            // ще вземем и ид-то и името на потребителя

        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('accsesToken', data.accessToken);

}