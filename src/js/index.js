import { fetchData } from "./api";

const testBtn = document.querySelector(".test-button");
const city = document.querySelector(".city-input");

document.addEventListener("DOMContentLoaded", () => {
  // fetchData("Mataram");
});

testBtn.addEventListener("click", () => {
  if (city.value) {
    fetchData(city.value);
    return;
  }
  fetchData("Mataram");
});
