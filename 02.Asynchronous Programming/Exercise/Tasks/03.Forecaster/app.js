async function attachEvents() {
    if( document.querySelector('div.forecasts') !== null){
        document.querySelector('div.forecasts').remove();
    }
    if( document.querySelector('div.forecast-info') !== null){
        document.querySelector('div.forecast-info').remove();
    }
    const location = document.getElementById('location');
    const btn = document.getElementById('submit');
    btn.addEventListener('click',getWeather);
    const forecast = document.getElementById('forecast');
    const degreesSymbol = '&#176';

    const currentConditions = document.getElementById('current');
    const futureConditions = document.getElementById('upcoming');

    const locationUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    
    const locationResponse = await fetch(locationUrl);
    const locationList = await locationResponse.json();
   
  
    async function getWeather(){
        forecast.style.display = 'contents';
        if( document.querySelector('div.forecasts') !== null){
            document.querySelector('div.forecasts').remove();
        }
        if( document.querySelector('div.forecast-info') !== null){
            document.querySelector('div.forecast-info').remove();
        }
       
        
        try {
        let currentObject = locationList.find(loc => loc.name === location.value);
        let todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${currentObject.code}`;
        let upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${currentObject.code}`;
        location.value = "";

        const todayResponse = await fetch(todayUrl);
        const todayForecast = await todayResponse.json();
        appendTodaydata(todayForecast);
//debugger
        const upcomingResponse = await fetch(upcomingUrl);
        const upcomingForecast = await upcomingResponse.json();
        appendFutureData(upcomingForecast.forecast);
        
        
        
        } catch (error) {
            forecast.textContent = "Error";
        }

    }

    async function appendTodaydata(data){
        
        let divEl = document.createElement('div');
        divEl.className = 'forecasts';
        
        let spanSymbol = document.createElement('span');
        spanSymbol.classList.add('condition', 'symbol');
        spanSymbol.innerHTML = getConditionSymbol(data.forecast.condition);

        let spanCondition = document.createElement('span');
        spanCondition.className = 'condition';

        let forecastData = document.createElement('span');
        forecastData.className = "forecast-data";
        forecastData.textContent = `${data.name}`;
        spanCondition.appendChild(forecastData);

        let forecastDegrees = document.createElement('span');
        forecastDegrees.className = "forecast-data";
        forecastDegrees.textContent = `${data.forecast.low}\xB0/${data.forecast.high}\xB0`;
        spanCondition.appendChild(forecastDegrees);

        let forecastCondition = document.createElement('span');
        forecastCondition.className = "forecast-data";
        forecastCondition.textContent = `${data.forecast.condition}`;
        spanCondition.appendChild(forecastCondition);

        divEl.appendChild(spanSymbol);
        divEl.appendChild(spanCondition);
        currentConditions.appendChild(divEl);
    }

    async function appendFutureData(data){
        let div = document.createElement('div');
        div.className = 'forecast-info';
   
        for (let i = 0; i < data.length; i++) {
            
            let spanUpcoming = document.createElement('span');
            spanUpcoming.className = 'upcoming';
    
            let spanSymbol = document.createElement('span');
            spanSymbol.classList.add('symbol');
            spanSymbol.innerHTML = getConditionSymbol(data[i].condition);
            spanUpcoming.appendChild(spanSymbol);
    
            let forecastDegrees = document.createElement('span');
           forecastDegrees.className = "forecast-data";
            forecastDegrees.textContent = `${data[i].low}\xB0/${data[i].high}\xB0`;
            spanUpcoming.appendChild(forecastDegrees);
    
            let forecastCondition = document.createElement('span');
            forecastCondition.className = "forecast-data";
            forecastCondition.textContent = `${data[i].condition}`;
            spanUpcoming.appendChild(forecastCondition);
    
            div.appendChild(spanUpcoming);
            
        }

       futureConditions.appendChild(div);
    }

    function getConditionSymbol(condition){
        switch(condition){
            case "Sunny": return '&#x2600;';
            case "Partly sunny": return "&#x26C5;";
            case "Overcast": return "&#x2601;";
            case "Rain": return "&#x2614;";
        }
    }
}

attachEvents();