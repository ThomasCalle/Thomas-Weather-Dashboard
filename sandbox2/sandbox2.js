var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var cityDate = document.getElementById("citydate");
var cityName = document.getElementById("cityname");
var temp = document.getElementById("temp");
var humid = document.getElementById("humid");
var wind = document.getElementById("wind");
var weatherDisplay = document.getElementById("displayweather");
var weatherIcon = document.getElementById("weathericon");
var apiKey = "4019261bd78cd50daccdfd0a8e4719ed";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";

searchButton.addEventListener("click",()=>{
    const city = searchInput.value.trim();
    if(city ===""){
        alert("Please enter a city");
        return;
    }
    fetch(`${baseURL}${city}&units=metric&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
        cityName.textContent = data.name;
        cityDate.textContent = new Date().toLocaleDateString("en-us",{weekday:'long'});
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
        temp.textContent = `Temperature; ${data.main.temp}°C`;
        humid.textContent = `Humidity; ${data.main.humidity}%`;
        wind.textContent = `Wind Speed; ${data.main.wind}km/h`;
        weatherDisplay.textContent = `${data.weather[0].description}`;
    });
});


