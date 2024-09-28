import { renderData } from "./renderData";
import { handleError } from "./handleError";

const API_KEY = "SZFVC4TUXTGQS4SH6F48GUNEG";

async function fetchData(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`;
  const cachedResponse = await caches.match(url);
  if (cachedResponse) {
    const cachedJSON = await cachedResponse.json();
    renderData(cachedJSON);
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
