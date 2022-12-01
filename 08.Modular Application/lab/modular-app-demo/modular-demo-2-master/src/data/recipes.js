import { get } from './api.js';
    //във папка data са всички файлове които обработват данните за изгледите
    //в случая рецептите за catalogView 

const pageSize = 3;
    //големината на страницата, колко рецепти да показва. 
    //Пример: търсим кола и сме получили 100 резултата, 
    //чрез Pagination регулираме по колко да се показват на страницата, 
    //pageSize е единия ел. от Pagination, другия е offset който казва колко резултата да прескочим
    //на стр. 1 pageSize=3 offset=0, на стр.2 pageSize=3 offset=3, на стр.3 pageSize=3 offset=6,
    //Pagination е различен на всички сървъри и трябва да се проверява когато качваме апп

const endpoints = {
    'recipes': '/data/recipes?sortBy=_createdOn%20desc',
    'byId': '/data/recipes/',
};

export async function getAll(page, query) {
        //с тази функция обработваме данните за Pagination, за търсене и навигация между стр/те
    let dataUrl = endpoints.recipes; //два URL-a единия за данните другия за големината на колекцията
    let sizeUrl = dataUrl;           //колкото са рецептите в базата
    dataUrl += `&pageSize=${pageSize}&offset=${(page - 1) * pageSize}`; 
        // към първия добавяме динамично колко елемента да се показват и offset-a
    if (query) { // проверяваме дали е query
        dataUrl += `&where=${encodeURIComponent(`name LIKE "${query}"`)}`; // добавяме към двата
        sizeUrl += `&where=${encodeURIComponent(`name LIKE "${query}"`)}`; //параметъра по който търсим
    }
    sizeUrl += '&count'; //добавяме кода за броя към втория URL

    const [data, size] = await Promise.all([ //изчаква отговора и от двете заявки 
            //и деструктурираме данните слет като сме пратили заявка с двата URL-a
        get(dataUrl),
        get(sizeUrl)
    ]);
    return {
        data,                           //тук са данните от Query-то
        pages: Math.ceil(size / pageSize) // връщам броя страници 
    };                                    //(броя на елем. / броя който искаме да се показва)
}

window.getAll = getAll;

export async function getById(id) {
    return get(endpoints.byId + id);
        //когато кликнем на някоя рецепта от списъка тази функция взима данните за нея
        //като извиква get заявка със url
}