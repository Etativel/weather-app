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
