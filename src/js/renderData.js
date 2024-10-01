// Forecast for the next 10 days

// Use another API for location (If possible)

// use localstorage to get latest

import { icons } from "./assets";
import { formatDate, formatTimeToAMPM, tempConverter } from "./formatter";
import { attachDailyForecastIcon } from "./attachIcon";
import { lineChart } from "./visualization";

async function renderCurrentWeather(data) {
  // console.log(data.days[0]);
  const cityContainer = document.querySelector(".curr-city");
  const countryContainer = document.querySelector(".curr-country");
  const tempContainer = document.querySelector(".temp-value");
  const humidContainer = document.querySelector(".humid-value");
  const windContainer = document.querySelector(".wind-value");
  const currentWeatherIcons = document.querySelector(".curr-weather-icon");
  const dateContainer = document.querySelector(".date");

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
  // const date = data.days["0"].datetime;
  const formatedDate = formatDate(new Date());
  const temp = Math.ceil(data.currentConditions.temp);
  // const maxTemp = data.days["0"].tempmax;
  // const minTemp = data.days["0"].tempmin;
  // const feelsLike = data.currentConditions.feelslike;
  const humidity = Math.ceil(data.currentConditions.humidity);
  // const chanceOfRain = data.currentConditions.precipprob;
  const windSpeed = Math.ceil(data.currentConditions.windspeed);
  // const uvIndex = data.currentConditions.uvindex;

  currentWeatherIcons.src = icons()[`${icon}`];
  cityContainer.textContent = country;
  countryContainer.textContent = city;
  tempContainer.textContent = tempConverter(temp);
  humidContainer.textContent = humidity;
  windContainer.textContent = windSpeed;
  dateContainer.textContent = formatedDate;
  tempContainer.appendChild(degree);
  humidContainer.appendChild(percent);
  windContainer.append(kmH);
  // console.log(data);
  lineChart();
}

function renderDailyForecast(data) {
  const dailyForcastCtr = document.querySelector(".today-forecast");
  dailyForcastCtr.innerHTML = "";

  let count = 0;
  data.days[0].hours.forEach((data) => {
    if (count < 24) {
      const time = formatTimeToAMPM(data.datetime);
      const icon = data.icon;
      const temp = Math.ceil(tempConverter(data.temp));
      const degree = document.createElement("sup");
      degree.textContent = "o";
      degree.classList.add("small");

      const container = document.createElement("div");
      container.classList.add(`today-ctr-${count}`);
      container.classList.add("hourly-cast");

      const hourlyWeather = `
            <p>${time}</p>
            <img src="" alt="" class="today-icon hourly-icon ${icon}" />
            <p class="today-temp">${temp}</p>
      `;

      container.innerHTML = hourlyWeather;
      container.querySelector(".today-temp").appendChild(degree);
      dailyForcastCtr.appendChild(container);
      count++;
    }
  });
  attachDailyForecastIcon();
}

export { renderCurrentWeather, renderDailyForecast };
