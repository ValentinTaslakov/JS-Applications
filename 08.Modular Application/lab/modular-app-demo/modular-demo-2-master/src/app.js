import { page } from './lib.js';
import { render, html, nothing } from '../node_modules/lit-html/lit-html.js';

import { showAbout } from './views/about.js';
import { showCatalog } from './views/catalog.js';
import { showCreate } from './views/create.js';
import { showDetails } from './views/details.js';
import { showHome } from './views/home.js';
import { notFound } from './views/notFound.js';
import { showLogin } from './views/login.js';
import { getUserData } from './util.js';
import { showRegsiter } from './views/register.js';
import { logout } from './data/auth.js';

    //главния файл който менажира другите

const navTemplate = (user) => html`
<a href="/">Home</a>
<a href="/recipes">Catalog</a>
${user ? html`<a href="/create">Create</a>` : nothing}
<a href="/about">About</a>
${user ? html`<span>Welcome, ${user.username}</span><a href="/logout">Logout</a>` : html`<a href="/login">Login</a>
<a href="/register">Register</a>`}
`;

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}
 //ctx - е контекстен път който е известен и като поддиректория
 //която се залепя към URL-a и ни показва в къде в документа се намираме
function decorateContext(ctx, next) {
    render(navTemplate(ctx.user), document.querySelector('nav'));

    ctx.render = function (content) {
        render(content, document.querySelector('main'));
    };
    next();
}

function parseQuery(ctx, next) {
    ctx.query = {};    //и това се прави в случай че нямаме параметри
    if (ctx.querystring) {  //проверяваме дали имаме querystring, дали има някакви параметри и ако има
        const query = Object.fromEntries(ctx.querystring //сплитваме за да вземем елементите от
            .split('&')                                  //Url-то, за Pagination това са стр. на която
            .map(e => e.split('=')));                   // сме и търсената рецепта
        Object.assign(ctx.query, query);     // и го взимаме като обект и закачаме query-то за контекста
    }

    next(); // e задължителен при Middleware.next() предава модифицирания контекст нататък по веригата
}           // и казва че текущия handler е приключил и може да се премине към следващия по веригата
            //ако го няма ще се спре на тази функция и page няма да изпълни другите

function session(ctx, next) {
    const user = getUserData();

    if (user) {
        ctx.user = user;
    }

    next();
}
//page ни дава лесен начин за работа с ctx и обновяване на URL-a и в същото време работи с 
//с Browser History където се запазват директориите къде сме били и бутоните Back and Forward 
//работят и ни местят през тази история
//подаваме поддиректорията като линк който сме закачили някъде(например навигацията горе) 
//и Page създава листенер, и при кликване на този бутон се стартира функцията която сме подали.

page(session);  //тези трите се изпълняват винаги без значение кой път сме заредили те се казват
page(decorateContext); // Global Middleware
page(parseQuery);
page('/index.html', '/'); // това е редирект ако се опита да отвори /index.html(като се пише в URL bar) отива в '/'
page('/', showHome);      // и като отиде там се изпълнява функцията
page('/recipes', showCatalog);
page('/create', showCreate);
page('/recipes/:id', showDetails);
page('/about', showAbout);
page('/login', showLogin);
page('/register', showRegsiter);
page('/logout', onLogout);
page('*', notFound);
//тук е списъка с нашите URL-и и какво да се зарежда, долу задължително page.start();
page.start();