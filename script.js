let header = document.querySelector('.header');
let cityNameInput = document.querySelector('.cityname'); 
let content = document.querySelector('.content');
let btn = document.querySelector('.btn');
let api = "Your API Key here";

btn.addEventListener('click',event => { 
    event.preventDefault();
    let city = cityNameInput.value;
    if (city) {
            getWeatherData(city)
            .then(weatherData =>{
                getWeatherInfo(weatherData);
            })
            .catch(error=>{
                console.log(error);
                getError(error);
            })
            }   
    else {
        getError("City not Found");
    }
});

function getWeatherData(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    return fetch(apiUrl)
    .then(response =>{
        if(!response.ok){
            throw new Error("City not Found");
        }
        return response.json();
    });
    
}

function getWeatherInfo(data) {
    let { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;
    let cityDisplay = document.querySelector('.city');
    let tempDisplay = document.querySelector('.temperature');
    let humidityDisplay = document.querySelector('.humidity');
    let statusDisplay = document.querySelector('.status');
    let emojiDisplay = document.querySelector('.emoji');

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
    let displayError = document.querySelector('.retry');
    displayError.innerHTML = message;
}
