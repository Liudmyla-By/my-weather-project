let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes <= 9 ? '0' + minutes : minutes;
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(dateStamp) {
  let date = new Date(dateStamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {

    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
      <div class="weather-fofcast-date">${formatDay(forecastDay.time)}</div>
<img clas="icon" src = "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
width = "50"/>
<div class="weather-fofcast-tempo">
  <span class="weather-fofcast-tempo-max">${Math.round(forecastDay.temperature.maximum)}°</span>
  <span class="weather-fofcast-tempo-min">${Math.round(forecastDay.temperature.minimum)}°</span>
</div>
</div>
`;
    }
  })
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6023o651f6tfcb9ffa0c896e14d7ed9c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;

  celsiusTemperatura = response.data.main.temp;

  let iconElement = document.querySelector("#icon")
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "354998d4eaa98e68cffddb71ab23cd32";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function cityPrevent(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityPrevent);

function currentButton(position) {
  let apiKey = "354998d4eaa98e68cffddb71ab23cd32";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentButton);
}

let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", searchCurrentLocation);

function changingToCelsius(event) {
  event.preventDefault();
  temperatureCelsius.classList.add("active");
  temperatureFahrenheit.classList.remove("active");
  let tempoCelsius = document.querySelector("#temperature");
  tempoCelsius.innerHTML = Math.round(celsiusTemperatura);
}
let temperatureCelsius = document.querySelector("#celsius");
temperatureCelsius.addEventListener("click", changingToCelsius);


function changingToFahrenheit(event) {
  event.preventDefault();
  let tempoElement = document.querySelector("#temperature");
  temperatureCelsius.classList.remove("active");
  temperatureFahrenheit.classList.add("active");
  let tempoFahrenheit = (celsiusTemperatura * 9) / 5 + 32;
  tempoElement.innerHTML = Math.round(tempoFahrenheit);

}
let celsiusTemperatura = null;

let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", changingToFahrenheit);

search("Lisbon");
