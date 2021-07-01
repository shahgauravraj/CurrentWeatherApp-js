const api = {
  key: "7de0d921408986d71962bcb7868b7332",
  base: "http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    document.activeElement.blur();
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].description;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_max)}°c / ${Math.round(weather.main.temp_min)}°c`;

  let feelslike = document.querySelector('.current .feels-like');
  feelslike.innerText = `Feels like: ${Math.round(weather.main.feels_like)}°c`;

  let humidity = document.querySelector('.current .humidity');
  humidity.innerText = `Humidity: ${weather.main.humidity}%`;

  let pressure = document.querySelector('.current .pressure');
  pressure.innerText = `Pressure: ${weather.main.pressure} hPa`;

  let windSpeed = document.querySelector('.current .wind');
  windSpeed.innerText = `Wind speed: ${weather.wind.speed} m/s`;
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}