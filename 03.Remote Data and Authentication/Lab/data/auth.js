const urlRegister = 'http://localhost:3030/users/register';
const urlLogin = 'http://localhost:3030/users/login';
const urlLogout = 'http://localhost:3030/users/logout';
    //Адреса на който ще пращам заявките за регистрация, като тук сървиса е друг
    //В лаба има линк към документацията на учебния сървър и там е описано 
    //и адресите за изпращане на заявките и какво се връща 
    //Учебния сървър , а и много приложения работят с Токен за удостоверяване 'Authentication'
    //, друг вариант е с бисквитки. При логване сървъра инициализира сесия 
    //ни връща обект със данни за логнатия потребител и токен който е свързан със тази сесия
    //трябва да го вземем този токен и при следващи заявки от логнатия потребител 
    //трябва да изпозваме този токен за authorization

document.getElementById('login-form').addEventListener('submit', onLogin);
document.getElementById('logout').addEventListener('click', onLogout);

async function onLogin(event){
    event.preventDefault(); 

    const formData = new FormData(event.target);
        //взимаме данните въведени във формата от потребителя
    const {email, password} = Object.fromEntries(formData.entries());
        //взимаме данните първо като масив и после като обект и така взимаме полетата на 
        //един ред, като така и не позволяваме на потребителя чрез инспект на браузъра 
        //да въведе допълнителни полета които да се пратят на сървъра
    
    const response = await fetch(urlLogin, {
       method: 'post',
       headers: {
        'Content-Type': 'application/json'
       },
       body: JSON.stringify({email, password})
    });

    const data = await response.json();
        //взимаме отговора от сървъра като json
    sessionStorage.setItem('accessToken', data.accessToken);
        //запазваме токена в sessionStorage на браузъра като първо му даваме име
        //и после взимаме стойноста му от отговора. sessionStorage се пази докато не затворим 
        //таба а localStorage се пази докато не го изтрием ръчно
    sessionStorage.setItem('userId', data._id);
        //това го взимаме и запаметяваме за да може да проверим дали коментара е писан
        //от същия потребител и да му дадем права да го изтрие и съответно
        //друг потребител да не може да изтрие чужд коментар като не добавяме delete бутон
    window.location = '/';
        //при логване да ни връща в страницата с коментарите

}

async function onLogout(){
    const token = sessionStorage.getItem('accessToken');
        //взимаме токена от хранилището в браузъра за да го използваме при заявката 
        //за authorization
    await fetch(urlLogout, {
        method: 'get',
        headers: {
            'X-Authorization': token
            // с този header връщаме към сървъра токена,
            // учебния сървър работи с X-Authorization сървиз
        }
    });
}