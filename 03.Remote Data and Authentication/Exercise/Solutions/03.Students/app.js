const url = 'http://localhost:3030/jsonstore/collections/students';
const table = document.getElementById('results');

 function init() {
    document.getElementById('form').addEventListener('submit', onSubmit);
    getStudents();
}

init();

async function getStudents() {
    const response = await fetch(url);
    const data = await response.json();

    fullfilltable(Object.values(data));
}

function fullfilltable(data) {
    const tableBody = table.children[1];
    tableBody.replaceChildren("");

    data.forEach(student => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML =
            `<th>${student.firstName}</th>
         <th>${student.lastName}</th>
         <th>${student.facultyNumber}</th>
         <th>${student.grade}</th>`;
        tableBody.appendChild(tableRow);
    });

}

async function postNewStudent(student) {
    await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    });

    getStudents();
}
function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');
    

    if (firstName !== "" && lastName !== "" && facultyNumber !== "" && grade !== "") {
        postNewStudent({firstName,lastName,facultyNumber,grade});
    }
}


