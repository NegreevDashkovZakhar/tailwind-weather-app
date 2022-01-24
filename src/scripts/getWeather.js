function getWeather() {
    console.log('get weather called');
    getTodayTemperature();
}

function getTodayTemperature() {
    console.log('toady temperature called');
    let element = document.getElementById('today-temperature');
    let currentTemperature = 15;
    element.textContent = `${currentTemperature} `;
    element.innerHTML = element.innerHTML + '&deg;C';
}