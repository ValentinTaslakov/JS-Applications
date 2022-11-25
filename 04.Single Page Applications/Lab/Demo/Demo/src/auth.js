//правим този модул за да проверява има ли логнат потрбител и от там
// да крием и показваме правилните бутони в навигацията
//така като изнасяме логика в отделен модул избягваме кръговата зависимост

export function checkUserNav(){
    const username = sessionStorage.getItem('username');

    if(username){
        [...document.querySelectorAll('.guest')].forEach(s => s.style.display = 'none');
        [...document.querySelectorAll('.user')].forEach(s => s.style.display = 'inline');

        document.getElementById('welcome-msg').textContent = `Welcome, ${username}!`;
    }else{
        [...document.querySelectorAll('.guest')].forEach(s => s.style.display = 'inline');
        [...document.querySelectorAll('.user')].forEach(s => s.style.display = 'none');
    }
}

document.getElementById('logout-link').addEventListener('click', onLogout);

async function onLogout(event){
    event.preventDefault();

    const token = sessionStorage.getItem('accessToken');

    await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': token
        }
    })
}