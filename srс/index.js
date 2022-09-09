let now = new Date();
let date = document.querySelector(".date");
let time = document.querySelector(".time");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let day = now.getDate();
let year = now.getFullYear();
date.innerHTML = `${month} ${day}, ${year}`;
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}
time.innerHTML = `${hour}:${min}`;

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".temp");
  currentTemp.innerHTML = `${temperature}°C`;
  let location = document.querySelector(".location");
  location.innerHTML = `${response.data.name}`;
  let weatherType = document.querySelector(".weather");
  weatherType.innerHTML = `${response.data.weather[0].main}`;
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = Math.round(`${response.data.wind.speed}`);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;
}
function search(city) {
  let apiKey = "0850737b187ff240978d0480433b9b8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let changeCity = document.querySelector("#search-city");
changeCity.addEventListener("submit", searchCity);

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0850737b187ff240978d0480433b9b8c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationTemp = document.querySelector("#current-location-temp");
currentLocationTemp.addEventListener("click", getLocation);

search("Kyiv");

function seeFahrenheit(event) {
  event.preventDefault();
  let mainTemprature = document.querySelector(".temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;

  mainTemprature.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}

let celsiusTemp = null;

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", seeFahrenheit);

function seeCelsius(event) {
  event.preventDefault();
  let mainTemprature = document.querySelector(".temp");
  mainTemprature.innerHTML = `${Math.round(celsiusTemp)}°C`;
}
let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", seeCelsius);
