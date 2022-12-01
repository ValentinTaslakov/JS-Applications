// тук ни е сървиса за правене на заявки

import { clearUserData, getUserData } from '../util.js';

const host = 'http://localhost:3030';
//базовия URL който е есднакъв за всички заявки

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };
        //в оригиналната функция създаваме обект с опциите на заявката горе

    const user = getUserData();
        //взимаме данните на логнатия потребител, ако има 
    if (user) {
            //ако има логнат потребител трябва да се добави ауторизацията
            //ауторизацията ни трябва за delete ако искаме да изтрием коментар или рецепта които са
            //на логнатия, за post ако искаме да публикуваме рецепта или коментар
        options.headers['X-Authorization'] = user.accessToken;
    }

    if (data !== undefined) {
            //ако имаме данни добавяме контент тип и боди, защото щом сме подали данни 
            //значи ще публикуваме или ще променяме post and put
        options.headers['Content-Type'] = 'application.json';
        options.body = JSON.stringify(data);
    }

    try {
        //хващаме ако има грешка
        const response = await fetch(host + url, options);
            //пускаме заявката и чакаме отговор 
        if (response.status == 204) {
            //проверяваме статуса на отговора ако няма съдържание връщаме отговора
            return response;
        }

        const data = await response.json();
            // ако имаме съдържание (при get) го взимаме
        if(response.ok == false) {
            //проверяваме и ок-статуса - при false трябва да хванем грешка
            if (response.status == 403) {
                //проверявам и за този статус за забранен ресурс и изтриваме данните в сесията
                //клиента е известен на сървъра, но няма ауторизация за този ресурс 
                clearUserData();
            }
            throw new Error(data.message);
                //хвърляме грешка със съобщението от отговора на заявката, подадено от сървъра
        }

        return data;
            //ако премине капаните за грешки връщаме данните
    } catch (err) {
        alert(err.message);
            //извещаме съобщението за грешка и подаваме грешката нататък
        throw err;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');

//експортват се само обвързаните функции(функции със същото тяло като на оригиналната в случая request) 
//със методите, когато ни потрябва заявка някъде извикваме метода
//подаваме данните ако има и от тук тези функции подават метода и данните