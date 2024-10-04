import { icons } from "./assets";
import { formatDate, formatTimeToAMPM, tempConverter } from "./formatter";
import { attachDailyForecastIcon } from "./attachIcon";
import { dataInfo, lineChart } from "./visualization";
import { getCityName } from "./api";

function getDataVis(data) {
  const currentDate = new Date().toISOString().split("T")[0];
  const theData = data.days.find((day) => day.datetime === currentDate);

  return theData.hours.map((hour) => ({
    x: hour.datetime,
    y:
      dataInfo.getDataInfo() === "temp"
        ? tempConverter(hour[`${dataInfo.getDataInfo()}`])
        : hour[`${dataInfo.getDataInfo()}`],
  }));
}

async function renderCurrentWeather(data) {
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

  // const location = data.resolvedAddress.split(",");

  const location = await getCityName([data.latitude, data.longitude]);

  const icon = data.currentConditions.icon;
  const country = location.name;
  // const country = "Indonesia";
  const city = location.country;
  // const city = "ID";
  const formatedDate = formatDate(new Date());

  const temp = Math.ceil(data.currentConditions.temp);
  const humidity = Math.ceil(data.currentConditions.humidity);
  const windSpeed = Math.ceil(data.currentConditions.windspeed);

  currentWeatherIcons.src = icons()[`${icon}`];
  cityContainer.textContent = country;
  countryContainer.textContent = city;
  tempContainer.textContent = tempConverter(temp);
  humidContainer.textContent = humidity;
  windContainer.textContent = windSpeed;
  // dateContainer.textContent = formatedDate;
  dateContainer.textContent = `${formatedDate.weekday}, ${formatedDate.day} ${formatedDate.month} ${formatedDate.year}`;
  tempContainer.appendChild(degree);
  humidContainer.appendChild(percent);
  windContainer.append(kmH);

  const dataToVisualize = getDataVis(data);

  lineChart(dataToVisualize);
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
      degree.classList.add("small-text");

      const container = document.createElement("div");
      container.classList.add(`today-ctr-${count}`);
      container.classList.add("hourly-cast");

      const hourlyWeather = `
            <p class = "small-text">${time}</p>
            <img src="" alt="" class="today-icon hourly-icon ${icon}" />
            <p class="today-temp small-text">${temp}</p>
      `;

      container.innerHTML = hourlyWeather;
      container.querySelector(".today-temp").appendChild(degree);
      dailyForcastCtr.appendChild(container);
      count++;
    }
  });
  attachDailyForecastIcon();
}

function renderForecast(data) {
  const container = document.querySelector(".show-forecast");
  container.innerHTML = "";
  data.days.forEach((data) => {
    const formatedDate = formatDate(data.datetime);
    // console.log(data.conditions.split(","));
    const domContainer = document.createElement("div");
    domContainer.classList.add("fore-data");
    const dom = `
            <div class="left-fore">
              <img src="${icons()[data.icon]}" alt="" class="forecast-icon" />
              <div class="fore-temp">${tempConverter(data.temp)}<sup>o</sup></div>
              <div> <sub class = "fore-condition">${data.conditions.split(",")[0]}</sub></div>
            </div>
            <div class="right-fore"><div class="fore-day">${formatedDate.day}</div> ${formatedDate.month}, ${formatedDate.weekday}</div>
    `;
    domContainer.innerHTML = dom;
    container.appendChild(domContainer);
  });
}

function renderWorldForecast(data) {
  if (!data) {
    return;
  }
  const container = document.querySelector(".wf-overflow");
  container.innerHTML = "";
  data.forEach((item) => {
    // console.log(item);
    const id = item.worldId;
    const icon = item.icon;
    const city = item.city.split(" ")[0];
    const country = item.country;
    const temp = tempConverter(item.temp);
    const humid = Math.ceil(item.humidity);
    const domContainer = document.createElement("div");
    domContainer.classList.add("right-wf");
    const dom = `
              <img class="delete-world world-curr-icon" src = ${icons()[icon]}>
              <div class="world-title">${city}</div>
              <div class="world-sub-title">${country}</div>
              <div class = "world-fore-container">
                <div class = "world-temp medium">${temp}<sup>o</sup></div>
                <sub class = "smaller">                <div class = "world-humid">${humid}<sub class = "smallest">%</sub></div></sub>

              </div>
            `;
    domContainer.innerHTML = dom;
    container.appendChild(domContainer);
    domContainer
      .querySelector(".delete-world")
      .addEventListener("click", () => {
        deleteWorldForecast(id); // Call delete function with the id
      });
  });
}

function deleteWorldForecast(id) {
  console.log(id);
  const data = JSON.parse(localStorage.getItem("worldForecast"));
  const filteredData = data.filter((data) => data.worldId !== id);

  localStorage.setItem("worldForecast", JSON.stringify(filteredData));
  renderWorldForecast(filteredData);
}

function renderWebIcon(data) {
  const docTitle = document.querySelector(".web-title");
  const webIcon = document.querySelector(".web-icon");
  const iconName = data.currentConditions.icon;
  const condition = data.currentConditions.conditions.split(",")[0];
  // console.log(condition);
  docTitle.textContent = condition;
  webIcon.setAttribute("href", icons()[iconName]);
}

export {
  renderCurrentWeather,
  renderDailyForecast,
  getDataVis,
  renderForecast,
  renderWorldForecast,
  deleteWorldForecast,
  renderWebIcon,
};
