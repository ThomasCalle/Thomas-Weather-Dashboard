const apiKey = "YOUR_API_KEY";
const searchInputEl = document.getElementById("city-input");
const searchButtonEl = document.getElementById("search-button");
const historyListEl = document.getElementById("history-list");
const weatherBoxEl = document.getElementById("weather-box");

// Listen for form submission
document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const city = searchInputEl.value.trim();
  if (city === "") {
    return;
  }
  getLocation(city);
});

// Listen for search history click
historyListEl.addEventListener("click", function (event) {
  event.preventDefault();
  const city = event.target.textContent;
  getLocation(city);
});

// Get location coordinates from city name
function getLocation(city) {
  const locationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
  fetch(locationUrl)
    .then((response) => response.json())
    .then((data) => {
      const { name, lat, lon } = data[0];
      getWeather(name, lat, lon);
      saveToHistory(name);
    })
    .catch((error) => console.error(error));
}

// Get weather data from coordinates
function getWeather(city, lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`;
  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(city, data.current);
      displayForecast(data.daily);
    })
    .catch((error) => console.error(error));
}

// Display current weather data
function displayWeather(city, data) {
  const cityDayEl = document.createElement("p");
  cityDayEl.textContent = `${city} (${new Date(
    data.dt * 1000
  ).toLocaleDateString()})`;
  const citynameEl = document.createElement("p");
  citynameEl.textContent = data.weather[0].description;
  const tempEl = document.createElement("p");
  tempEl.textContent = `Temperature: ${data.temp} °C`;
  const humidEl = document.createElement("p");
  humidEl.textContent = `Humidity: ${data.humidity}%`;
  const windEl = document.createElement("p");
  windEl.textContent = `Wind Speed: ${data.wind_speed} m/s`;
  weatherBoxEl.innerHTML = "";
  const currentWeatherEl = document.createElement("div");
  currentWeatherEl.classList.add("card-column");
}