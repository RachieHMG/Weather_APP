// Time & Day
let now = new Date();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let todaysDate = document.querySelector("#today");
todaysDate.innerHTML = `${currentDate} ${currentMonth} ${currentYear} ${hour}:${minutes}`;

// Enter a City...

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city-input");
  let currentCityName = document.querySelector(".info");
  if (cityName.value) {
    currentCityName.innerHTML = cityName.value;
  } else {
    alert(`Error! Please Enter a City...`);
  }
}

let cities = document.querySelector(".d-flex");
cities.addEventListener("submit", searchCity);

// Current Weather

function searchWeather() {
  let citySearch = document.querySelector("#search-city-input");
  let units = "metric";
  let temp = "https://api.openweathermap.org/data/2.5/weather";
  let key = "7251f1e44b75cc42e0330ac7f968ec98";
  let url = `${temp}?q=${citySearch.value}&appid=${key}&units=${units}`;

  axios.get(url).then(showTemperature);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchWeather);

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#temperature");
  cityTemp.innerHTML = `${currentTemp}`;

  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = `${description}`;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind}mph`;

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
}

// °C and °F week 4 - need to fix
//function unitFahrenheit() {
//let temperature = document.querySelector("#temperature");
//temperature.innerHTML = `${temp}*1.8+32`;
//}
//let fahrenheit = document.querySelector("#unit-fahrenheit");
//fahrenheit.addEventListener("click", unitFahrenheit);

//function unitCelsius() {
//let temperature = document.querySelector("#temperature");
//temperature.innerHTML = `${temp}`;
//}
//let celsius = document.querySelector("#unit-celsius");
//celsius.addEventListener("click", unitCelsius);

// Current Weather Button to fix

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "7251f1e44b75cc42e0330ac7f968ec98";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function currentButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", currentButton);
