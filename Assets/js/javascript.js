var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var cityDayEl = document.getElementById("cityday");
var cityNameEl = document.getElementById("cityname");
var tempEl = document.getElementById("temp");
var humidEl = document.getElementById("humid");
var windEl = document.getElementById("wind");
var weatherDisplayEl = document.getElementById("displayweather");
var weatherIconEl = document.getElementById("weather-icon");
var apiKey = "4019261bd78cd50daccdfd0a8e4719ed";

function getLocation(city) {
  console.log("hello");
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
    getWeather(lat, lon)
    });
}

function getWeather(lat, lon){
    var weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=metric"+"&lang=english"+"&appid="+apiKey;
  fetch(weatherUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      displayWeather(data);
    });
}  

function displayWeather(data) {
  // Extract the relevant weather data from the API response
  var city = data.city.name;
  var date = new Date(data.list[0].dt * 1000);
  var temp = data.list[0].main.temp;
  var humid = data.list[0].main.humidity;
  var wind = data.list[0].wind.speed;

  console.log(data);

  // Update the DOM elements with the relevant weather data
  cityDayEl.textContent = city + " (" + date.toLocaleDateString() + ")";
  tempEl.textContent = "Temperature: " + temp + "°C";
  humidEl.textContent = "Humidity: " + humid + "%";
  windEl.textContent = "Wind Speed: " + wind + "KM/H";
  weatherIconEl.setAttribute("src", `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`);
}
  
// always leave at bottum
searchButtonEl.addEventListener("click", function () {
  var searchInput = searchInputEl.value; 
  console.log("searchInput");
  getLocation(searchInput);
});

// if(localStorage.getItem()!== null){
// }
// const setup = document.querySelector("")
// 
// 