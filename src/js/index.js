import { fetchData } from "./api";
import "../css/styles.css";
import profileImg from "../assets/Lerolero.jpg";
import { selectedTemperature, tempConverter } from "./formatter";
import { renderCurrentWeather } from "./renderData";

const city = document.querySelector(".search-input");
const input = document.querySelector(".search-input");
const profileImgContainer = document.querySelector(".profile-img");
const forecastContainer = document.querySelector(".today-forecast");
const tempUnit = document.querySelector(".temp-unit");

document.addEventListener("DOMContentLoaded", () => {
  let lastLocation = localStorage.getItem("lastLocation") || "Mataram";
  console.log(lastLocation);
  fetchData(lastLocation);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!city.value) {
      return;
    }
    fetchData(city.value);
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

tempUnit.addEventListener("click", () => {
  selectedTemperature.setTemperature(tempUnit.checked);
  fetchData(localStorage.getItem("lastLocation"));
  console.log(tempUnit.checked);
});
