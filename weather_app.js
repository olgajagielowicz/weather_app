//12885b89435459acb9895b49f192a741 - api key

const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "12885b89435459acb9895b49f192a741"
}

function getWeather() {
    const cityId = document.querySelector('#city').value;
    fetch(`${param.url}weather?id=${cityId}&units=metric&appid=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

function showWeather(data) {
    console.log(data);
    document.querySelector('.citi-name').innerHTML = data.name;
    document.querySelector('.temperatura').innerHTML = Math.round(data.main.temp) + '&deg';
    document.querySelector('.icon').innerHTML = '<img src="weather-app.png">';
    document.querySelector('.weather-description').innerHTML = data.weather[0]['description'][0].toUpperCase() + data.weather[0]['description'].slice(1);
    document.querySelector('.wind-deg').innerHTML = windDirection(data.wind.deg);
    document.querySelector('.wind-speed').innerHTML = `${data.wind.speed} km/h`;
    document.querySelector('.pressure').innerHTML = `${data.main.pressure} hPa`;
}

const cities = {
    703447: "Kyiv",
    756135: "Warsaw",
    6356055: "Barcelona",
    6455259: "Paris"
}

function f() {
    let mc = document.querySelector('.main-cities');
    let select = document.createElement('select');
    select.id = 'city';
    for (let key in cities) {
        let option = document.createElement('option');
        option.text = cities[key];
        option.value = key;
        select.appendChild(option);
    }
    mc.append(select);
}

f();

getWeather();

document.querySelector('#city').onchange = getWeather;

function windDirection(degree) {
    if (degree > 337.5) return 'Northerly';
    if (degree > 292.5) return 'North Westerly';
    if (degree > 247.5) return 'Westerly';
    if (degree > 202.5) return 'South Westerly';
    if (degree > 157.5) return 'Southerly';
    if (degree > 122.5) return 'South Easterly';
    if (degree > 67.5) return 'Easterly';
    if (degree > 22.5) return 'North Easterly';
}

