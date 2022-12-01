import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getAll } from '../data/recipes.js';
import { createSubmitHandler } from '../util.js';
// всички файлове във папка views обработват изгледите които се показват в браузъра
//тук за изгледа на каталога с рецепти

const catalogTemplate = (recipes, page, pages, search, onSubmit) => html`
<h2>Catalog</h2>
<div>
    <form @submit=${onSubmit}> <!--закачаме листенер към формата (така в html) -->
        <input name="search" type="text" .value=${search}> 
        <!-- това е формата за търсене и със .value= запазваме какво търси потребителя
              като задължително е с точка -->
        <button>Search</button>
    </form>
</div>
<div>
    <!-- тук са бутонит за предишна и следваща страница и показателя на кой страница сме
         като проверяваме накоя страница сме и съответно ако е нужно изключваме единия от
        двата бутона използвайки nothing(от lit) -->
    ${page > 1 ? html`<a href=${composeUrl(page - 1, search)}>&lt; Prev</a>` : nothing}
    <span>Page ${page} / ${pages}</span>
    ${page < pages ? html`<a href=${composeUrl(page + 1, search)}>Next &gt;</a>` : nothing}
</div>
<ul>
    <!-- Изреждаме рецептите използвайки repeat(от lit) -->
    ${repeat(recipes, r => r._id, recipeCardTemplate)}
</ul>`;

const recipeCardTemplate = (recipe) => html`
<!-- визуализирането на всяка рецепта като li -->
<li><a href=${'/recipes/' + recipe._id}>${recipe.name}</a></li>`;


function composeUrl(page, search) {
    //композираме url-a в зависимост дали имаме search параметър или не
    let url = `?page=${page}`;
    if (search) {
        url += '&search=' + search;
    }
    return url;
}


export async function showCatalog(ctx) {
        //тази функция се експортира към менажиращия файл и при натискане в навигацията на каталога
        //се идва тук а тази функция менажира всичко в catalog view
    console.log(ctx.user);
    const page = Number(ctx.query.page) || 1; //изваждам номера на текущата стр. ако е undefined подавам 1
    const search = ctx.query.search || '';   //също и за параметъра по който търсим ако е undefined подавам празен стринг

    ctx.render(html`<p>Loading &hellip;</p>`); // визуализация че се зарежда ресурса
    const { data: recipes, pages } = await getAll(page, search);

    ctx.render(catalogTemplate(recipes, page, pages, search, createSubmitHandler(onSubmit)));
        //възуализираме dom-a като подаваме данните и извикваме и функцията която хваща submit-a
        //и подаваме функцияята долу която редиректва към url-a със данните за търсене
        //и то се показва горе в бар-а на страницата

    function onSubmit(data, form) {
        ctx.page.redirect('/recipes?search=' + data.search);
    }
}

