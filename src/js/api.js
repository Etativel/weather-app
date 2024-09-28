import { renderCurrentWeather, renderDailyForcast } from "./renderData";
import { handleError } from "./handleError";

const API_KEY = "LN6UDU35ETQ9B4CG3C36RJSGT";

// "SZFVC4TUXTGQS4SH6F48GUNEG";

async function fetchData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`;
  const cachedResponse = await caches.match(url);
  if (cachedResponse) {
    const cachedJSON = await cachedResponse.json();
    renderCurrentWeather(cachedJSON);
    renderDailyForcast(cachedJSON);
    return;
  }
  try {
    const response = await fetch(url);
    // console.log(response);
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    } else {
      const cache = await caches.open("WeatherCache");
      cache.put(url, response.clone());
      const responseJSON = await response.json();
      renderData(responseJSON);
    }
  } catch (error) {
    handleError(error);
  }
}

export { fetchData };
