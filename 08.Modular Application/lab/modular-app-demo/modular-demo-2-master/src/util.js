//методите за работа с данни

export function createSubmitHandler(callback) {
    return function(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
    
        callback(data, event.target);
    };
}
//тази функция връща функция с preventDefault за събмита и изважда данните от формата, които връщаме
//като обект, също връщаме и мястото на събмит

export function setUserData(data) {
    sessionStorage.setItem('email', data.email);
    sessionStorage.setItem('username', data.username);
    sessionStorage.setItem('_id', data._id);
    sessionStorage.setItem('accessToken', data.accessToken);
}
//тук запазваме данните за логнатия потребител в сесията

export function getUserData() {
    if (sessionStorage.getItem('accessToken') == null) {
        return null;
    } else {
        return {
            email: sessionStorage.getItem('email'),
            username: sessionStorage.getItem('username'),
            _id: sessionStorage.getItem('_id'),
            accessToken: sessionStorage.getItem('accessToken')
        };
    }
}
//тук взимаме данните на логнатия потребител като проверяваме дали има такъв,ако няма връщаме null

export function clearUserData() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('_id');
    sessionStorage.removeItem('accessToken');
}

//тук изчистваме данните при logout