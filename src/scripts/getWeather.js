const apiKey = '9aaeda92fc69595d8b72a88a346725cd';
const apiAdress = 'https://api.openweathermap.org/data/2.5';

function getWeather() {
    getTodayTemperature();
}

function getTodayTemperature() {
    let temperatureElement = document.getElementById('today-temperature');
    let cityElement = document.getElementById('city-name');
    let descriptionElement = document.getElementById('weather-description');
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
    };
    request.send();
}