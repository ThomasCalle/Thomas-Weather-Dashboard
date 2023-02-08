var searchInputEl = document.getElementById("search-input");
var searchButtonEl = document.getElementById("search-button");
var apiKey = "4019261bd78cd50daccdfd0a8e4719ed";
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
    getWeather(lat, lon)
    });
}

function getWeather(lat, lon){
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

    });
}


searchButtonEl.addEventListener("click", function () {
  var searchInput = searchInputEl.value;
  console.log(searchInput);
  getLocation(searchInput);
});
