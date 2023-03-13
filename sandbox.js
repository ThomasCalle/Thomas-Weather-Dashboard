// const apiKey = "YOUR_API_KEY";
// const searchInputEl = document.getElementById("city-input");
// const searchButtonEl = document.getElementById("search-button");
// const historyListEl = document.getElementById("history-list");
// const weatherBoxEl = document.getElementById("weather-box");

// // Listen for form submission
// document.querySelector("form").addEventListener("submit", function (event) {
//   event.preventDefault();
//   const city = searchInputEl.value.trim();
//   if (city === "") {
//     return;
//   }
//   getLocation(city);
// });

// // Listen for search history click
// historyListEl.addEventListener("click", function (event) {
//   event.preventDefault();
//   const city = event.target.textContent;
//   getLocation(city);
// });

// // Get location coordinates from city name
// function getLocation(city) {
//   const locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
//   fetch(locationUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       const { name, lat, lon } = data[0];
//       getWeather(name, lat, lon);
//       saveToHistory(name);
//     })
//     .catch((error) => console.error(error));
// }

// // Get weather data from coordinates
// function getWeather(city, lat, lon) {
//   const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`;
//   fetch(weatherUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       displayWeather(city, data.current);
//       displayForecast(data.daily);
//     })
//     .catch((error) => console.error(error));
// }

// // Display current weather data
// function displayWeather(city, data) {
//   const cityDayEl = document.createElement("p");
//   cityDayEl.textContent = `${city} (${new Date(
//     data.dt * 1000
//   ).toLocaleDateString()})`;
//   const citynameEl = document.createElement("p");
//   citynameEl.textContent = data.weather[0].description;
//   const tempEl = document.createElement("p");
//   tempEl.textContent = `Temperature: ${data.temp} °C`;
//   const humidEl = document.createElement("p");
//   humidEl.textContent = `Humidity: ${data.humidity}%`;
//   const windEl = document.createElement("p");
//   windEl.textContent = `Wind Speed: ${data.wind_speed} m/s`;
//   weatherBoxEl.innerHTML = "";
//   const currentWeatherEl = document.createElement("div");
//   currentWeatherEl.classList.add("card-column");
// }

var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var cityDayEl = document.getElementById("cityday");
var cityNameEl = document.getElementById("cityname");
var tempEl = document.getElementById("temp");
var humidEl = document.getElementById("humid");
var windEl = document.getElementById("wind");
var weatherDisplayEl = document.getElementById("displayweather");
var weatherIconEl = document.getElementById("weathericon");
var historyListEl = document.getElementById("history-list");
var apiKey = "4019261bd78cd50daccdfd0a8e4719ed";
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function getLocation(city) {
  var locationUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apiKey;
  fetch(locationUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0]);
      console.log(data[0].name);
    var lat = data [0].lat;
    var lon =data [0].lon;
    getWeather(lat, lon, city)
    });
}

function getWeather(lat, lon, city){
    var weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+
    "&appid=" +
    apiKey;
  fetch(weatherUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      displayWeather(data, city);
      searchHistory.push(city);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      displayHistory();
    });
}  

function displayWeather(data, city) {
  // Extract the relevant weather data from the API response
  var date = new Date(data.list[0].dt * 1000);
  var temp = data.list[0].main.temp;
  var humid = data.list[0].main.humidity;
  var wind = data.list[0].wind.speed;

  // Update the DOM elements with the relevant weather data
  cityDayEl.textContent = city + " (" + date.toLocaleDateString() + ")";
  cityNameEl.textContent = city;
  tempEl.textContent = "Temperature: " + temp + " °C";
  humidEl.textContent = "Humidity: " + humid + "%";
  windEl.textContent = "Wind Speed: " + wind + " MPH";
}

function displayHistory() {
  // Clear existing search history
  historyListEl.innerHTML = "";

  // Display up to 5 most recent searches
  var maxIndex = Math.min(searchHistory.length, 5);
  for (var i = 0; i < maxIndex; i++) {
    var historyItem = document.createElement("li");
    historyItem.textContent = searchHistory[i];
    historyListEl.appendChild(historyItem);
  }
}

// Display search history on page load
displayHistory();

// always leave at bottom
searchButtonEl.addEventListener("click", function () {
  var searchInput = searchInputEl.value; 
  
