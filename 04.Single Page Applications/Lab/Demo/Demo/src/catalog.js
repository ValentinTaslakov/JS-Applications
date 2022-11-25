import { showDetailsView } from "./details.js";

// get data from REST service
// parse and display each recipe

const url = 'http://localhost:3030/data/recipes';
const list = document.getElementById('recipe-list');
list.addEventListener('click', openRecipe);
    //добавям листенер към листа за да локализирам върху коя рецепта е кликнато
    //да и взема ид-то и да заредя детайлите за тази рeцепта
document.getElementById('catalog-link').addEventListener('click',showCatalogView);
    //добавили сме навигацията и слагам листенер на бутона от където зареждам
    //функцията която зарежда изгледа за всички рецепти

export async function showCatalogView(){
        //понеже и двете секции сме ги направили да не се виждат 
        //тук ще покажем само тази с каталога на рецептите
    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');
        //това скрива всички секции
    
    const recipes = await getAllRecipes();
    
    document.getElementById('catalog-view').style.display = 'block';
        //това ще направи видима нужната ни секция
        //и вместо да експортваме всички функции ще направим тази да извиква другите
        //и ще експортнем само нея
    
    displayRecipes(recipes);
}

async function getAllRecipes(){
        // export пишем за да можем да инпортнем тази функция в главния модул
        //защото в HTML-a е закачен гл. модул и ако не импортна тази функция там 
        //не мога да я достъпя за тест в браузъра 
    const response = await fetch(url +"?select="+ encodeURIComponent('_id,name'));
        //този селектор на url-то го правим за да вземем само тези две полета
        //другите данни за сега не ни трябват
        //трябва да имаме и error handling но за сега го пропускаме
    const recipes = await response.json();

    return recipes;
}

function displayRecipes(recipes){
    const doms = recipes.map(createRecipeDOM);

    const fragment = document.createDocumentFragment();
        //създаваме фрагмент в който слагаме всички създадени дом елементи
        // и като трябва го пускаме в HTML-a 
        //така като създаваме елементите в цикъл не предизвикваме refload на страницата
        //или не я натоварваме на всяка итерация на цикъла
    for (const item of doms) {
        fragment.appendChild(item);
    }

    list.replaceChildren(fragment);
    //взимаме листа и заместваме всичко в него с фрагмента
}

function createRecipeDOM (recipe){
    const element = document.createElement('li');
    element.textContent = recipe.name;

        //създаваме 'а' елемент със съответните атрибути, именно този елемент понеже 
        // searching bots работят по добре с него(трябва да проверя) 
    const link = document.createElement('a');
    link.href = 'javascript:void(0)';
    link.text = '[Details]';
    link.id = recipe._id;
    element.appendChild(link);

    return element;

    //функция в която за всяка рецепта правим елемент 
    //и като текст добавяме името на рецептета
}

function openRecipe(event) {
    if (event.target.tagName == "A"){
        event.preventDefault();
        const id = event.target.id;
        showDetailsView(id);
    }
}