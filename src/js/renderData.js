// Data list
// Country, city, date
// temperature now  , max min, feels like
// Humidity, chance of rain
// wind speed, uv index
//

// Get for current weather, display in the main div
// Get the 24H weather, append using for each, display to a div

// Forecast for the next 10 days

// Use another API for location (If possible)

// use localstorage to get latest

import { icons } from "./assets";

async function renderCurrentWeather(data) {
  console.log(icons().clearday);
  const cityContainer = document.querySelector(".curr-city");
  const countryContainer = document.querySelector(".curr-country");
  const tempContainer = document.querySelector(".temp-value");
  const humidContainer = document.querySelector(".humid-value");
  const windContainer = document.querySelector(".wind-value");
  const currentWeatherIcons = document.querySelector(".curr-weather-icon");

  const degree = document.createElement("sup");
  degree.textContent = "o";
  degree.classList.add("small");

  const percent = document.createElement("sub");
  percent.textContent = "%";
  percent.classList.add("small");

  const kmH = document.createElement("sub");
  kmH.textContent = "km/h";
  kmH.classList.add("small");

  const location = data.resolvedAddress.split(",");
  const icon = data.currentConditions.icon;
  const country = location[0];
  const city = location[1];
  const date = data.days["0"].datetime;
  const temp = Math.ceil(data.currentConditions.temp);
  const maxTemp = data.days["0"].tempmax;
  const minTemp = data.days["0"].tempmin;
  const feelsLike = data.currentConditions.feelslike;
  const humidity = Math.ceil(data.currentConditions.humidity);
  const chanceOfRain = data.currentConditions.precipprob;
  const windSpeed = Math.ceil(data.currentConditions.windspeed);
  const uvIndex = data.currentConditions.uvindex;

  currentWeatherIcons.src = icons()[`${icon}`];
  cityContainer.textContent = country;
  countryContainer.textContent = city;
  tempContainer.textContent = temp;
  humidContainer.textContent = humidity;
  windContainer.textContent = windSpeed;
  tempContainer.appendChild(degree);
  humidContainer.appendChild(percent);
  windContainer.append(kmH);
  console.log(data);
}

function renderDailyForcast(data) {
  data.days.forEach((data) => console.log(data));
}

export { renderCurrentWeather, renderDailyForcast };
