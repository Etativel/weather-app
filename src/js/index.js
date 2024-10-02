import { fetchData } from "./api";
import "../css/styles.css";
import profileImg from "../assets/Lerolero.jpg";
import { selectedTemperature } from "./formatter";
import { dataInfo } from "./visualization";

const city = document.querySelector(".search-input");
const input = document.querySelector(".search-input");
const profileImgContainer = document.querySelector(".profile-img");
const forecastContainer = document.querySelector(".today-forecast");
const tempUnit = document.querySelector(".temp-unit");
const chartSelector = document.querySelector(".chart-selector");

document.addEventListener("DOMContentLoaded", () => {
  let lastLocation = localStorage.getItem("lastLocation") || "Mataram";
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
  console.log(tempUnit.checked);
});

chartSelector.addEventListener("click", (event) => {
  let lastLocation = localStorage.getItem("lastLocation") || "Mataram";
  if (event.target.tagName === "BUTTON") {
    const clickedButtonClass = event.target.classList;
    if (clickedButtonClass.contains("humidity-btn")) {
      dataInfo.setDataInfo("humidity");
      fetchData(lastLocation);
    } else if (clickedButtonClass.contains("tmp-btn")) {
      dataInfo.setDataInfo("temp");
      fetchData(lastLocation);
    } else if (clickedButtonClass.contains("uv-btn")) {
      dataInfo.setDataInfo("uvindex");
      fetchData(lastLocation);
    }

    document
      .querySelectorAll(".viz-btn")
      .forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
  }
});
