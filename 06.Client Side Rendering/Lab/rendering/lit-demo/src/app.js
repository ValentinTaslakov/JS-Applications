import {html, render} from 'https://unpkg.com/lit-html?module';
    //импортираме Lit директно от сайта
import {table} from './table.js';


    

//const p = name => html`<p>Hello ${name}!</p>`;
    //анонимна функция с която чрез импорта генерираме html, трябва да стои най-отгоре или да е в
    //отделен файл който да импортваме

//render(p('world'),document.querySelector('main'));
//render(p('Peter'),document.querySelector('nav'));
    //функцията render идва от Лит и вкарва нашия html във базовия html
    //чрез функцията горе подаваме различни имена и html-a се вкарва с различни имена
    //на различни места 

const data = [
    {
        name: 'Peter',
        id: 'asd1',
        canEdit: false,
        style: {
            color: 'red',
            border: '1px solid black'
        }
    },// добавяме поле за класа горе
    { // по същия начин добавяме и поле ако искаме клас атрибут долу
        name: 'Mary',
        id: 'asd2',
        canEdit: false,
        highlight: {
            class: 'active'
        }
    },
    {
        name: 'Ivan',
        id: 'asd3',
        canEdit: false
    }
]
    // данните са обекти които съм вкарал в масив

const root = document.querySelector('main');
    // взимам елемента в който ще поставям изгледите
update();
    //извиквам update където рендерирам данните
function onClick(id){
    const item = data.find(i => i.id == id);
        //намирам елемента по ид от данните
    update();
}

function update(){
    render(table(data, onClick), root);
        //рендерираме, подаваме функция в която пускаме данните и горната функция
        // и  елемента в който ще поставим новия Html
}

