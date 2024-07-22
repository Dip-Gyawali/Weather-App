let header = document.querySelector('.header');
let cityNameInput = document.querySelector('.cityname'); 
let content = document.querySelector('.content');
let displayError = document.querySelector('.retry');
let btn = document.querySelector('.btn');
let api = "7efeeb1a75d538cf6eb7f9d6dd8766a0";

let cityDisplay = document.querySelector('.city');
let tempDisplay = document.querySelector('.temperature');
let humidityDisplay = document.querySelector('.humidity');
let statusDisplay = document.querySelector('.status');
let emojiDisplay = document.querySelector('.emoji');

btn.addEventListener('click',async event => { 
    event.preventDefault();
    let city = cityNameInput.value;
    if (city) {
        try{
            displayError.innerHTML='';
            let weatherData = await getWeatherData(city);
            getWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            getError(error);
        }
    }   
    else {
        
        getError("City not Found");
    }
});

async function getWeatherData(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    let res = await fetch(apiUrl)
    if(!res.ok){
        throw new Error("City not Found");
    }
    return await res.json();
    
}

function getWeatherInfo(data) {
    let { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    cityDisplay.innerHTML = city;
    tempDisplay.innerHTML = `${(temp - 273.15).toFixed(1)} °C`;
    humidityDisplay.innerHTML = `Humidity: ${humidity}%`;
    statusDisplay.innerHTML = description;
    emojiDisplay.innerHTML = getWeatherEmoji(id);
}

function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return '🌩️';
        case (weatherId >= 300 && weatherId < 400):
            return '🌧️';
        case (weatherId >= 500 && weatherId < 600):
            return '🌧️';
        case (weatherId >= 600 && weatherId < 700):
            return '❄️';
        case (weatherId >= 700 && weatherId < 800):
            return '🌫️';
        case (weatherId === 800):
            return '🌞';
        case (weatherId >= 801 && weatherId < 900):
            return '☁️';
        default:
            return '❓';
    }
}

function getError(message) {
    cityDisplay.innerHTML='';
    tempDisplay.innerHTML='';
    humidityDisplay.innerHTML='';
    statusDisplay.innerHTML='';
    emojiDisplay.innerHTML='';
    displayError.innerHTML = message;
}
