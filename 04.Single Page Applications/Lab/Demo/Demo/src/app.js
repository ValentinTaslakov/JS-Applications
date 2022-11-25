import { checkUserNav } from './auth.js';
import { showCatalogView } from './catalog.js';
//импортвам функцията
import './details.js';
import './login.js' ;
//директен импорт на модула без да се извиква дадена функция,
// а за да се закачи модула за апп-а 

checkUserNav();
//извиквам функцията
showCatalogView();


    //създавам обект в който ще слагам всички инпортнати функции
    //само за да мога да я тествам във конзолата на браузъра
//window.api = {
//
//};
