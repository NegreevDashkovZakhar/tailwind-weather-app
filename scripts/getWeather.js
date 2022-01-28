const apiKey = '9aaeda92fc69595d8b72a88a346725cd';
const apiAdress = 'https://api.openweathermap.org/data/2.5';

const imagePath = 'images/weather/';
const weatherImagesMap = {
    'Rain': 'rainy.png',
    'Snow': 'snow.png',
    'Drizzle': 'rainy.png',
    'Thunderstorm': 'storm.png',
    'Clouds': 'cloudy.png',
    'Clear': 'sunny.png',
    'Sun': 'sunny.png',
    'Default': 'fog.png'
}

let currentLocation = {
    'lat': 0,
    'lon': 0
}

async function getWeather() {
    await getTodayWeather();
    await getForecast();
}

async function getTodayWeather() {
    let cityName = document.getElementById('city-name').value;
    let response = await fetch(`${apiAdress}/weather?q=${cityName}&lang=ru&units=metric&appid=${apiKey}`);
    let data = await response.json();
    console.log('recieved data ', data);
    setTodayWeather(data);
}

function setTodayWeather(data) {
    let temperatureElement = document.getElementById('today-temperature');
    let cityElement = document.getElementById('city-name');
    let descriptionElement = document.getElementById('weather-description');
    let imageElement = document.getElementById('weather-image');
    let feelsLikeElement = document.getElementById('feels-like-temperature');
    let windSpeedElement = document.getElementById('wind-speed');

    //Using innerHTML might be not safe though it is used to insert special symbol such as &deg;
    //Rounding temperature
    currentLocation = data.coord;
    let currentTemperature = data.main.temp.toFixed(2);
    temperatureElement.textContent = `${currentTemperature} `;
    temperatureElement.innerHTML = temperatureElement.innerHTML + '&deg;C';
    cityElement.value = data.name;
    descriptionElement.textContent = data.weather[0].description;
    if (weatherImagesMap.hasOwnProperty(data.weather[0].main)) {
        imageElement.src = imagePath + weatherImagesMap[data.weather[0].main];
    } else {
        imageElement.src = imagePath + weatherImagesMap.Default;
    }
    feelsLikeElement.textContent = `Ощушается как: ${data.main.feels_like}`;
    feelsLikeElement.innerHTML = feelsLikeElement.innerHTML + '&deg;C';
    windSpeedElement.textContent = `Скорость ветра: ${data.wind.speed} м/с`;
}

async function getForecast() {
    let response = await fetch(`${apiAdress}/onecall?lat=${currentLocation.lat}&lon=${currentLocation.lon}&lang=ru&units=metric&appid=${apiKey}`);
    let data = await response.json();
    console.log('recieved data ', data);
    setForecastWeather(data);
}

function setForecastWeather(data) {
    for (let i = 0; i < 7; i++) {
        let forecastDate = new Date();
        forecastDate.setDate(forecastDate.getDate() + i + 1);
        let forecastDateFormatted = {
            'day': forecastDate.getDate(),
            'month': forecastDate.getMonth(),
            'year': forecastDate.getFullYear()
        }
        let tommorowLabelElement = document.getElementById(`forecast-${i}-label`);
        let tommorowTemperatureElement = document.getElementById(`forecast-${i}-temperature`);
        let tommorowWindSpeedElement = document.getElementById(`forecast-${i}-descritpion`);
        tommorowLabelElement.textContent = `${getFromatedDate(forecastDateFormatted.day, forecastDateFormatted.month + 1, forecastDateFormatted.year)}`;
        tommorowTemperatureElement.textContent = Math.round(data.daily[i].temp.day);
        tommorowTemperatureElement.innerHTML = tommorowTemperatureElement.innerHTML + '&deg;C';
        tommorowWindSpeedElement.textContent = data.daily[i].weather[0].description;
    }
}

function getFromatedDate(days, months, years) {
    let daySpace = '';
    let monthSpace = '';
    if (days < 10) {
        daySpace = '0';
    }
    if (months < 10) {
        monthSpace = '0';
    }
    return `${daySpace}${days}.${monthSpace}${months}.${years}`;
}

function forecastDay(number) {
    let result = document.createElement('div');
    result.className = 'rounded-xl border-2 border-blue-600 p-2 max-w-full block';
    result.innerHTML = `<p class="text-xs md:text-base lg:text-xl inline-block w-fit mr-2 md:mr-6" id="forecast-${number}-label"></p>
    <p class="text-xs md:text-base lg:text-xl inline-block min-w-max w-8 md:w-16 mr-2 md:mr-6" id="forecast-${number}-temperature"></p>
    <p class="text-xs md:text-base lg:text-xl inline-block w-fit" id="forecast-${number}-descritpion"></p>`;
    return result;
}

function addForecastHTML() {
    let host = document.getElementById('forecast-holder');
    for (let i = 0; i < 7; i++) {
        host.appendChild(forecastDay(i));
        console.log('Appending children');
    }
}