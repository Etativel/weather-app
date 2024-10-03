// const testBtn = document.querySelector(".test-btn");
// testBtn.addEventListener("click", () => {
//   worldForecast("jakaasdfrta");
// });

import { fetchData, getLonLat, worldForecast } from "./api";
import "../css/styles.css";
import profileImg from "../assets/Lerolero.jpg";
import { selectedTemperature } from "./formatter";
import { dataInfo } from "./visualization";
import { addMarker, initializeMap } from "./map";
import { fromLonLat } from "ol/proj";
import { renderWorldForecast } from "./renderData";

const city = document.querySelector(".search-input");
const input = document.querySelector(".search-input");
const profileImgContainer = document.querySelector(".profile-img");
const forecastContainer = document.querySelector(".today-forecast");
const tempUnit = document.querySelector(".temp-unit");
const chartSelector = document.querySelector(".chart-selector");

document.addEventListener("DOMContentLoaded", () => {
  let lastLocation =
    localStorage.getItem("lastLocation") || "116.10685,-8.5837726";
  fetchData(lastLocation);
  initializeMap();
});

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    if (!city.value) {
      return;
    }
    const convertLocation = await getLonLat(city.value);

    if (!convertLocation) {
      city.value = "";
      return;
    }
    const coordinate = fromLonLat(convertLocation);
    addMarker(coordinate);
    fetchData(convertLocation);
    city.value = "";
    return;
  }
});

profileImgContainer.src = profileImg;

forecastContainer.addEventListener("wheel", function (event) {
  if (event.deltaY !== 0) {
    event.preventDefault();
    forecastContainer.scrollLeft += event.deltaY;
  }
});

const tempIcon = document.querySelector(".unit-label");
const degree = document.createElement("sup");
degree.classList.add("small");
degree.textContent = "o";

tempIcon.classList.add("unit-label");
tempIcon.setAttribute("id", "unit");

tempUnit.addEventListener("click", () => {
  selectedTemperature.setTemperature(tempUnit.checked);
  if (tempUnit.checked === false) {
    tempIcon.textContent = "F";
    tempIcon.appendChild(degree);
  } else {
    tempIcon.textContent = "C";
    tempIcon.appendChild(degree);
  }

  fetchData(localStorage.getItem("lastLocation"));
});

chartSelector.addEventListener("click", (event) => {
  let lastLocation = localStorage.getItem("lastLocation");

  const convertLocation = lastLocation.split(",");

  if (event.target.tagName === "BUTTON") {
    const clickedButtonClass = event.target.classList;
    if (clickedButtonClass.contains("humidity-btn")) {
      dataInfo.setDataInfo("humidity");
      fetchData(convertLocation);
    } else if (clickedButtonClass.contains("tmp-btn")) {
      dataInfo.setDataInfo("temp");
      fetchData(convertLocation);
    } else if (clickedButtonClass.contains("uv-btn")) {
      dataInfo.setDataInfo("uvindex");
      fetchData(convertLocation);
    }

    document
      .querySelectorAll(".viz-btn")
      .forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
  }
});

const selectForecast = document.querySelector(".forecast-selector");
const forecastOverflow = document.querySelector(".show-forecast");
const forecastItems = document.querySelectorAll(".fore-data");
selectForecast.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const clickedButtonClass = e.target.classList;
    if (clickedButtonClass.contains("4-days-btn")) {
      forecastOverflow.scrollTop = 0;
      forecastItems.forEach((item, index) => {
        if (index < 4) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
      forecastOverflow.classList.remove("forecast-overflow");
      forecastOverflow.classList.add("forecast-overflow-hidden");
    } else if (clickedButtonClass.contains("10-days-btn")) {
      forecastOverflow.scrollTop = 0;
      forecastItems.forEach((item) => {
        item.style.display = "block";
      });
      forecastOverflow.classList.remove("forecast-overflow-hidden");
      forecastOverflow.classList.add("forecast-overflow");
    }
    document.querySelectorAll(".forecast-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
  }
});

const worldForecastContainer = document.querySelector(".wf-container-overflow");
const wfOverflow = document.querySelector(".wf-overflow");

worldForecastContainer.addEventListener("wheel", function (event) {
  // console.log("this child", wfOverflow.children.length);
  if (wfOverflow.children.length <= 6) {
    return;
  }
  if (event.deltaY !== 0) {
    event.preventDefault();
    worldForecastContainer.scrollLeft += event.deltaY;
  }
});

// add worldForecast call fetchData
// store the fetchdata to localstorage for world forecast
// call renderworldforecast everytime its get clicked and show the data from local storage

// Call a pop up window when submit call fetch
const addWorldForecast = document.querySelector(".add-world");
const dialogContainer = document.querySelector(".formDialog");
const cityForm = document.querySelector(".dialog-form");
const closeForm = document.querySelector(".cancel-form");
const cityValue = document.querySelector(".city-input");

addWorldForecast.addEventListener("click", () => {
  dialogContainer.showModal();
});

closeForm.addEventListener("click", () => {
  dialogContainer.close();
  if (cityForm) cityForm.reset();
});

cityForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  dialogContainer.close();
  await worldForecast(cityValue.value);

  const data = JSON.parse(localStorage.getItem("worldForecast"));

  renderWorldForecast(data);

  if (cityForm) cityForm.reset();
});
