let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes <= 9 ? '0' + minutes : minutes;
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;



function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  let tempoCelsius = document.querySelector("#temperature");
  tempoCelsius.innerHTML = 25;
}
let temperatureCelsius = document.querySelector("#celsius");
temperatureCelsius.addEventListener("click", changingToCelsius);


function changingToFahrenheit(event) {
  event.preventDefault();
  let tempoFahrenheit = document.querySelector("#temperature");
  tempoFahrenheit.innerHTML = 77;
}
let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", changingToFahrenheit);
let iconElement = document.querySelector("#icon");