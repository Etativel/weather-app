import { fetchData } from "./api";

const testBtn = document.querySelector(".test-button");
// const city = document.querySelector(".city-input");

testBtn.addEventListener("click", () => {
  fetchData("Mataram");
});
