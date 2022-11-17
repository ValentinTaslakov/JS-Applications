async function getInfo() {
    const stopIdInfo = document.getElementById('stopId');
    const stopId = stopIdInfo.value;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    stopIdInfo.value = ""; //тук изчистваме въведената спирка в полето от потребителя
        //Правим си горе адреса да приема спирката въведена от потребителя
       
    const stopNameElement = document.getElementById('stopName');
        //взимаме елементите където ще сложим извлечените данни за спирката
    const busList = document.getElementById('buses');

    try {
         // и долу правим заявка с адреса и записваме отговора който е 'обещание' 
        //че ще получим данни
        const response = await fetch(url);
        // данните от това обещание трябва да се извлечат за да ги ползваме, това става 
        //като взимаме данните в json
         const data = await response.json();

         
         busList.innerHTML = "";//на всяко натискане на бутона изчистваме 
                             //списъка от предходното

         stopNameElement.textContent =  data.name;
             //от json взимаме името и го парсваме където трябва

         Object.entries(data.buses).forEach(([busNumber, timeArrive]) => {
             const li = document.createElement('li');
             li.textContent = `Bus ${busNumber} arrives in ${timeArrive} minutes`;
             busList.appendChild(li);
         })
             //създаваме списъка, създаваме елемент, слагаме коректния текст в елемента и 
             // апендваме елемента към парента, като това се прави за бусове от JSON данните
    } catch (error) {
        stopNameElement.textContent = "Error";
    }

    //с try/catch хващаме възникналите грешки и ги обработваме в съобщения
}