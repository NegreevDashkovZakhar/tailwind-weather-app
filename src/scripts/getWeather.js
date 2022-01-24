const apiKey = '9aaeda92fc69595d8b72a88a346725cd';
const apiAdress = 'https://api.openweathermap.org/data/2.5';

const imagePath = 'images/weather/';
const weatherImagesMap = {
    'Rain': 'rainy.png',
    'Snow': 'rainy.png',
    'Clouds': 'cloudy.png',
    'Sun': 'sunny.png',
    'Default': 'sunny-cloudy.png'
}


function getWeather() {
    getTodayTemperature();
}

function getTodayTemperature() {
    let temperatureElement = document.getElementById('today-temperature');
    let cityElement = document.getElementById('city-name');
    let descriptionElement = document.getElementById('weather-description');
    let imageElement = document.getElementById('weather-image');
    let cityName = cityElement.value;
    let request = new XMLHttpRequest();
    request.open('GET', `${apiAdress}/weather?q=${cityName}&lang=ru&units=metric&appid=${apiKey}`);
    request.onload = () => {
        let data = JSON.parse(request.response);
        console.log('recieved data %j', data);
        //Rounding temperature
        let currentTemperature = data.main.temp.toFixed(2);
        //Using innerHTML might be not safe though it is used to insert special symbol such as &deg;
        temperatureElement.textContent = `${currentTemperature} `;
        temperatureElement.innerHTML = temperatureElement.innerHTML + '&deg;C';
        cityElement.value = data.name;
        descriptionElement.textContent = data.weather[0].description;
        if (weatherImagesMap.hasOwnProperty(data.weather[0].main)) {
            imageElement.src = imagePath+weatherImagesMap[data.weather[0].main];
        } else {
            imageElement.src = imagePath+weatherImagesMap.Default;
        }
    };
    request.send();
}