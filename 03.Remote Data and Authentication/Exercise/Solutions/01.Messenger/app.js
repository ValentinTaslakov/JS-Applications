const url =  'http://localhost:3030/jsonstore/messenger';
const messageArea = document.getElementById('messages');
const authorInput = document.querySelector('[name="author"]');
const contentInput = document.querySelector('[name="content"]');

async function attachEvents() {
    document.getElementById('refresh').addEventListener('click', getMessages);
    document.getElementById('submit').addEventListener('click', postMessage);
}

attachEvents();

 async function postMessage(){
    let author = authorInput.value;
    let content = contentInput.value;
    const message = {author, content};
    
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }); 

    getMessages();
}

async function getMessages(){
    const response = await fetch(url);
    const data = await response.json();

    createDomElement(Object.values(data));
}

function createDomElement(data){
    messageArea.textContent = "";
    let messages = [];
    data.forEach(element => {
        messages.push(`${element.author}: ${element.content}`);
    });

    messageArea.textContent = messages.join("\n");
}