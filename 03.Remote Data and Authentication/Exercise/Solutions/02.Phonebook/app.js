const url = 'http://localhost:3030/jsonstore/phonebook';
const phonebook = document.getElementById('phonebook');
const personField = document.getElementById('person');
const phoneField = document.getElementById('phone');

function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', getPhonebook);
    document.getElementById('btnCreate').addEventListener('click', newPhoneData);
    phonebook.addEventListener('click',onDelete);
    
    getPhonebook();
}

attachEvents();

async function getPhonebook(){
    const response = await fetch(url);
    const data = await response.json();

    createPhonebookDom(Object.values(data));
}

async function postPhone(phone){
    const response = await fetch(url,{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(phone)
    });
    getPhonebook();
}

async function deletePhone(key){
    await fetch(url + '/' + key, {
        method: 'delete'
    });
    getPhonebook();
}


function createPhonebookDom(data){
    phonebook.replaceChildren("");

    data.forEach(element => {
        const li = document.createElement("li");
        li.textContent = `${element.person}: ${element.phone}`;
        li.id = element._id;
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        li.appendChild(delBtn);
        phonebook.appendChild(li);
    });
}

function newPhoneData(){
    let person = personField.value;
    let phone = phoneField.value;

    personField.value = "";
    phoneField.value = ""
    postPhone({person,phone});
    
}

function onDelete(ev){
    if (ev.target.tagName == 'BUTTON'){
        const key = ev.target.parentElement.id;
        deletePhone(key);
    }
}
