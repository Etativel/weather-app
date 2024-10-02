import { renderCurrentWeather, renderDailyForecast } from "./renderData";
import { handleError } from "./handleError";
import { showMap } from "./map";

const API_KEY = "LN6UDU35ETQ9B4CG3C36RJSGT";

// "SZFVC4TUXTGQS4SH6F48GUNEG";

async function fetchData(location) {
  localStorage.setItem("lastLocation", location);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`;
  const currentDate = new Date().toISOString().split("T")[0];

  // const currentDate = "2024-10-03";

  const cachedResponse = await caches.match(url);

  if (cachedResponse) {
    const cachedJSON = await cachedResponse.json();
    if (cachedJSON.days[0].datetime === currentDate) {
      renderCurrentWeather(cachedJSON);
      renderDailyForecast(cachedJSON);
      showMap([cachedJSON.longitude, cachedJSON.latitude]);
      return;
    }
  }
  try {
    const response = await fetch(url);
    console.log("New fetch", response);
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    } else {
      const cache = await caches.open("WeatherCache");
      cache.put(url, response.clone());
      const responseJSON = await response.json();
      renderCurrentWeather(responseJSON);
      renderDailyForecast(responseJSON);
      showMap([responseJSON.longitude, responseJSON.latitude]);
    }
  } catch (error) {
    fetchData("Mataram");
    handleError(error);
  }
}

export { fetchData };
