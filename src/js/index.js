import { fetchData } from "./api";
import "../css/styles.css";

import profileImg from "../assets/Lerolero.jpg";

// const testBtn = document.querySelector(".test-button");
const city = document.querySelector(".search-input");

document.addEventListener("DOMContentLoaded", () => {
  fetchData("Mataram");
});

// testBtn.addEventListener("click", () => {
//   if (city.value) {
//     fetchData(city.value);
//     return;
//   }
//   fetchData("Mataram");
// });

const profileImgContainer = document.querySelector(".profile-img");
profileImgContainer.src = profileImg;

import currIcon from "../assets/icons/5729381_snowflake_weather_winter_snowing_snow_forecast.png";

const currentWeatherIcons = document.querySelector(".curr-weather-icon");

currentWeatherIcons.src = currIcon;

import todayI from "../assets/icons/5729382_forecast_sun_cloud_weather_raining.png";

const todayIcon = document.querySelectorAll(".today-icn");

todayIcon.forEach((icon) => {
  icon.src = todayI;
});

import todaybg from "../assets/cloudy-sky-landscape-wallpaper.jpg";

const todayback = document.querySelectorAll(".today-ctr");
todayback.forEach((container) => {
  // container.style.backgroundImage = `url(${todaybg})`;
});
