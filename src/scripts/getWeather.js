const apiKey = '9aaeda92fc69595d8b72a88a346725cd';
const apiAdress = 'https://api.openweathermap.org/data/2.5';
const cityTest = 'Omsk';

function getWeather() {
    getTodayTemperature(cityTest);
}

function getTodayTemperature(city) {
    let temperatureElement = document.getElementById('today-temperature');
    let cityElement = document.getElementById('city-name');
    let request = new XMLHttpRequest();
    request.open('GET', `${apiAdress}/weather?q=${city}&appid=${apiKey}`);
    request.onload = () => {
        let data = JSON.parse(request.response);
        //Converting temperature to celsius
        let currentTemperature = (data.main.temp - 273.3).toFixed(2);
        //Using innerHTML might be not safe though it is used to insert special symbol such as &deg;
        temperatureElement.textContent = `${currentTemperature} `;
        temperatureElement.innerHTML = temperatureElement.innerHTML + '&deg;C';
        cityElement.textContent = city;
    };
    request.send();
}