// VARSITY TUTOR SESSION: 
// Tutors, suggested approach to handle the array... 

var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var cityDayEl = document.getElementById("cityday");
var cityNameEl = document.getElementById("cityname");
var cityHistoryEl = document.getElementById("city-history")

var tempEls = [
  document.getElementById("temp"), 
  document.getElementById("temp1"),
  document.getElementById("temp2"),
  document.getElementById("temp3"),
  document.getElementById("temp4"),
  document.getElementById("temp5"),
];

var humidEls = [
  document.getElementById("humid"), 
  document.getElementById("humid1"),
  document.getElementById("humid2"),
  document.getElementById("humid3"),
  document.getElementById("humid4"),
  document.getElementById("humid5")
];

var windEls = [
  document.getElementById("wind"), 
  document.getElementById("wind1"),
  document.getElementById("wind2"),
  document.getElementById("wind3"),
  document.getElementById("wind4"),
  document.getElementById("wind5")
];

var weatherIconEls = [
  document.getElementById("weather-icon"),
  document.getElementById("weather-icon1"),
  document.getElementById("weather-icon2"),
  document.getElementById("weather-icon3"),
  document.getElementById("weather-icon4"),
  document.getElementById("weather-icon5")
];

var weatherDisplayEl = document.getElementById("displayweather");
var weatherIconEl = document.getElementById("weather-icon");
var apiKey = "4019261bd78cd50daccdfd0a8e4719ed";
var cities=[];
var city_history=[];

var temps=[6];
var humids=[6];
var winds=[6];

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
  cityHistoryEl.textcontext= "toronto";
  

  for (let i=0;i<6;i++){
    temps[i] = data.list[i].main.temp;
    humids[i] = data.list[i].main.humidity;
    winds[i] = data.list[i].wind.speed;
  }

  for (let i=0;i<5;i++){
    cities.push(data.list[i]);
  }

  // Update the DOM elements with the relevant weather data
  cityDayEl.textContent = city + " (" + date.toLocaleDateString() + ")";

  for (let j=0; j<6; j++){
    tempEls[j].textContent = "Temperature: " + temps[j] + "°C";
    humidEls[j].textContent = "Humidity: " + humids[j] + "%";
    windEls[j].textContent = "Wind Speed: " + winds[j] + "KM/H";
    weatherIconEls[j].setAttribute("src", `https://openweathermap.org/img/w/${data.list[j].weather[0].icon}.png`);
  }
}
function printCityHistory()
{
  cityHistoryEl.innerHTML=""
  for (let i=0;i<city_history.length;i++){
  var cityEl = document.createElement("li")
  cityEl.textContent = city_history[i];
  cityHistoryEl.appendChild(cityEl)

}
}


// always leave at bottum
searchButtonEl.addEventListener("click", function () {
  var searchInput = searchInputEl.value; 
  //console.log("searchInput");
  getLocation(searchInput);

  if (city_history.length<3){
  city_history.unshift(searchInput);
  } else{
    city_history.length= city_history.length-1;
    city_history.unshift(searchInput);
  }
  printCityHistory();
  //console.log("user hisotry ",city_history);
});


// if(localStorage.getItem()!== null){
// }
// const setup = document.querySelector("")
// 
// 