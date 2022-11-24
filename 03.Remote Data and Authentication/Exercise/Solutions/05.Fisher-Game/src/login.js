const url = 'http://localhost:3030/users/login';

if(sessionStorage.getItem('accessToken')){
    document.getElementById('user').style.display = 'inline-block';
    document.getElementById('guest').style.display = 'none';
}else{
    document.getElementById('user').style.display = 'none';
    document.getElementById('guest').style.display = 'inline-block'
}8