import { fetchData } from "./api";
import "../css/styles.css";

import profileImg from "../assets/Lerolero.jpg";

// const testBtn = document.querySelector(".test-button");
const city = document.querySelector(".search-input");

document.addEventListener("DOMContentLoaded", () => {
  fetchData("Mataram");
});

const input = document.querySelector(".search-input");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!city.value) {
      return;
    }
    fetchData(city.value);
    city.value = "";
    return;
  }
  // console.log(e.key);
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

import todayI from "../assets/icons/weather-icons/showers-day.png";

const todayIcon = document.querySelectorAll(".today-icn");

todayIcon.forEach((icon) => {
  icon.src = todayI;
});

import todaybg from "../assets/cloudy-sky-landscape-wallpaper.jpg";

const todayback = document.querySelectorAll(".today-ctr");
todayback.forEach((container) => {
  // container.style.backgroundImage = `url(${todaybg})`;
});

const forecastContainer = document.querySelector(".today-forecast");

forecastContainer.addEventListener("wheel", function (event) {
  if (event.deltaY !== 0) {
    event.preventDefault();
    forecastContainer.scrollLeft += event.deltaY;
  }
});
