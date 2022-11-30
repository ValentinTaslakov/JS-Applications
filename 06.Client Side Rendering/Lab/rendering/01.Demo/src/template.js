const placeholderPattern = /%%(.+?)%%/g;
//regex с скойто ще търсим 
const templates = {};

export async function render(templateName, ctx) {

    const html = await loadTemplate(templateName);

    const result = html.replace(placeholderPattern, replacer);
    //на replace може да се подаде регекс спрямо който да замени мачнатия елемент
    //подаваме и функция в която да обработим данните от мачването и да вземем каквото ни трябва
    document.querySelector('main').innerHTML = result;

    function replacer(match, name) {
        //за да видим какво се мачва подаваме ...match за да видим елементите като масив в 
        //конзолата със console.log(match) и в конзолата излиза масив с 4 ел.
        //от него на нас ни трябват само match name

        const value = ctx[name]
        //name използваме за да намерим такова поле в обекта и да вземем стойността му
        if (value !== undefined) {
            return escapeHtml(value);
        } else {
            //ако няма такова поле връщаме match, ако има name
            return match;
        }
    }

}

async function loadTemplate(name) {
    if (templates[name] === undefined){
        const response = await fetch(`./views/${name}.html`);
            //правим заявка към мястото където са изгледите , като името на изгледа 
            //който ни трябва подаваме в интерполиран стринг 
        templates[name] = await response.text();

    }
        //запазваме изгледа в обект и така ако пак се върнем на дадена страница
        //не изпращаме заявка отново а си взимаме изгледа от обекта
    return templates[name];
    
}

//за да избегнем злонамерено инжектиране на script понеже използваме 
//innerHtml трябва да заместим контролните символи(санитизиране!?), правим функция за това

function escapeHtml(html){
    return html.toString() // toString защото за catalog ни се подава масив
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('&', '&amp;')
}