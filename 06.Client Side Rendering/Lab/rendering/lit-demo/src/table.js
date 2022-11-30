import { html } from 'https://unpkg.com/lit-html?module';
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map.js?module';
//импортваме директива за стил по същия начин се импортва и ако искаме на таговете
import { classMap } from 'https://unpkg.com/lit-html/directives/class-map.js?module';
// да има клас атрибути

export const table = (items, onClick) => html`
<table>
    ${items.map(i => tableRow(i, onClick))}
</table>`; 
    // мапваме всеки обект през функция горе
    //и тази функция проверява едно от полетата и на база стойноцтта изгражда
    // HTML-a който ще е добавка на този горе и ще се рендерира

const tableRow = (item, onClick) => html`
<tr style=${styleMap(item.style || {})}> 
    <td class=${classMap(item.highlight || {})}>${item.name}</td>
    <td>
        ${item.canEdit
        ? html`<button>Edit</button><button>Delete</button>`
        : null
    }
    </td>
</tr>`;
//ако искаме да приложим стила пишем кода горе style=${styleMap(item.style || {})
// като добавяме || {} - в случай че някой от обектите няма поле за стил

