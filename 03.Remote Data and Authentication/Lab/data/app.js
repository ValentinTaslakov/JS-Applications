const url = 'http://localhost:3030/data/comments';
//след като съм разархивирал ресурсите, в тях има сървър влизам, отварям смд 
// и пускам файла server.js от терминала си взима url и добавям 
//jsonstore(сървиз в конкретния сървър или 'backend') и файла където 
//ще пазим и взимаме данни
const nameInput = document.querySelector('[name = "name"]');
const contentInput = document.querySelector('[name = "content"]');
const listOfComments = document.getElementById('comments');
init();

function init(){
     document.getElementById('load').addEventListener('click',getComments);
     document.getElementById('comment-form').addEventListener('submit', onPost);
     listOfComments.addEventListener('click', onCommentDelete);

     getComments();
}
        //първо пишем функциите които оперират със базата
        //после тези които манипулират DOM
        //така се разделят отговорностите и мога да ги тествам по отделно
        //и като направя функциите за базата и ги тествам съм сигурен че работят
        //и ако има проблеми после като ги извикам при манипулацията 
        //с ДОМ ще знам къде е грешката

async function onPost(event){
    event.preventDefault();
    const formData = new FormData(event.target);
        //използваме формуляр в HTML-a , като event.preventDefault() е задължително, 
        //понеже при submit на формата стандартното поведение е да презареди страницата
        //същото важи и за <а> елементи в HTML-a
    const name = formData.get('name'); //nameInput.value;  използвайки формата 
        //взимаме данните по този начин и предните два варианта са ненужни
        //Object.entries и Object.fromEntries първото от обекта взима ключ и стойност
        //и ги прави в масив, а второто от масив ги прави в  обект.
    const content = formData.get('content'); //contentInput.value;

    const result = await postComment({ content});
    listOfComments.prepend(createCommentDomElement(result));
}

async function getComments(){
 const response = await fetch(url+'?load=author%3D_ownerId%3Ausers');
 const data = await response.json();
 const comments = Object.values(data).reverse(); 
 
 displayComments(comments);
        //правим данните да се връщат в масив за по-лесна обработка
        //иначе ни връща обект като всеки коментар е парснат към свойство което е автоматично 
        //генерирано ид от сървиса, това ид го има и вътре в данните при коментара и името пак 
        //като свойство понеже коментара е обект със свойства име и 
        //съдържание и сървиса слага и ид. 
}

async function postComment(comment){
    const token = sessionStorage.getItem('accessToken');
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': token
        },
        body: JSON.stringify(comment)
    });
    //така се пише post заявка, всички полета са задължителни
    //долу взимаме отговора който сървъра връща, въпреки че няма да го използвам 
    //освен за проверка на функцията
    const data = await response.json();
    return data;
}

async function deleteComment(id) {
    const token = sessionStorage.getItem('accessToken');
    await fetch(url +'/' + id,{
        method: 'delete',
        headers: {
         'X-Authorization': token
        }
    });

     document.getElementById(id).remove();
}
function onCommentDelete(ev){
    if (ev.target.tagName == "BUTTON"){
        //понеже съм сложил листенер на целия лист от коментари проверявам дали е натиснат
        //бутона като задължително се изписва с главни букви, така няма да се изтрие като 
        //кликнем където и да е по коментара
        const choise = confirm('Are you sure you want to delete this comment?');
        //браузъра извежда съобщението със два бутона да и затвори
        //и проверяваме долу дали потребителя е натиснал да и след това взимаме ид-то и
        // го подаваме на функцията за изтриване.
        if (choise){
            const id = ev.target.parentElement.parentElement.id;
            deleteComment(id);
        }
       

    }
}
        // функции които пипат по ДОМ. Тези двете създават елементите в които ще се визуализират
        //коментарите, като коментарите ще дойдат от getComments функцията
        // сега оставя да добавим листенер и функция която да задейства тези трите.
function displayComments(comments){
    listOfComments.replaceChildren(...comments.map(createCommentDomElement));
        //спредвам го понеже трябва да са списък елементите
        //replaceChildren вътрешно вика метода toString и когато елементите идват
        //един след друг операцията се изпълнява правилно, ако подадем масив няма да 
        //сработи replaceChildren.
}


function createCommentDomElement(comment){
    const userId = sessionStorage.getItem('userId');

    const element = document.createElement('article');
    element.innerHTML = `<header><h3>${comment.author.username}</h3></header>
    <main><p>${comment.content}</p>`;
    
    if (comment._ownerId == userId){
        element.innerHTML += '<button>Delete</button></main>';
    }

    element.id = comment._id;
    return element;
}

async function updateComment(id, comment){
    const response = await fetch(url + id , {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });
    return response.json();
}
