import { renderCurrentWeather, renderDailyForecast } from "./renderData";
import { handleError } from "./handleError";
import { showMap } from "./map";
import { splitLocation } from "./formatter";

const API_KEY = "LN6UDU35ETQ9B4CG3C36RJSGT";
const API_KEY_2 = "6ed1c13520bbdb255f5c2fb196794ea8";
// "SZFVC4TUXTGQS4SH6F48GUNEG";

async function getLotLan(location) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY_2}`;

  const cachedLocation = await caches.match(url);
  try {
    if (cachedLocation) {
      const cachedJSON = await cachedLocation.json();
      const lat = cachedJSON[0].lat;
      const lon = cachedJSON[0].lon;

      return [lon, lat];
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    } else {
      const cache = await caches.open("locationCache");
      cache.put(url, response.clone());
      const responseJSON = await response.json();
      const lat = responseJSON[0].lat;
      const lon = responseJSON[0].lon;

      return [lon, lat];
    }
  } catch (error) {
    handleError(error);
  }
}

async function fetchData(location) {
  let url = ``;
  if (typeof location === "string") {
    location = splitLocation(location);
  }

  url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location[1]},${location[0]}?key=${API_KEY}`;

  localStorage.setItem("lastLocation", location);

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

export { fetchData, getLotLan };
