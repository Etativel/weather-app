import { renderCurrentWeather, renderDailyForecast } from "./renderData";
import { handleError } from "./handleError";

const API_KEY = "LN6UDU35ETQ9B4CG3C36RJSGT";

// "SZFVC4TUXTGQS4SH6F48GUNEG";

async function fetchData(location) {
  localStorage.setItem("lastLocation", location);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`;
  const currentDate = new Date().toISOString().split("T")[0];

  // const currentDate = "2024-10-03";

  console.log(currentDate);
  const cachedDate = localStorage.getItem("weatherCachedDate");
  const cachedResponse = await caches.match(url);

  if (cachedResponse && cachedDate === currentDate) {
    const cachedJSON = await cachedResponse.json();
    console.log("#####INSIDE CACHE#######");
    console.log(cachedJSON);
    renderCurrentWeather(cachedJSON);
    renderDailyForecast(cachedJSON);
    return;
  } else if (cachedDate !== currentDate) {
    localStorage.setItem("weatherCachedDate", currentDate);
  }
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    } else {
      const cache = await caches.open("WeatherCache");
      cache.put(url, response.clone());
      const responseJSON = await response.json();
      renderCurrentWeather(responseJSON);
      renderDailyForecast(responseJSON);
    }
  } catch (error) {
    fetchData("Mataram");
    handleError(error);
  }
}

export { fetchData };
