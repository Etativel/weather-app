import {
  renderCurrentWeather,
  renderDailyForecast,
  renderForecast,
  renderWebIcon,
} from "./renderData";
import { handleError } from "./handleError";
import { showMap } from "./map";
import { splitLocation, tempConverter } from "./formatter";

const API_KEY = "LN6UDU35ETQ9B4CG3C36RJSGT";
const API_KEY_2 = "6ed1c13520bbdb255f5c2fb196794ea8";
// "SZFVC4TUXTGQS4SH6F48GUNEG";

async function getCityName(lonLat) {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lonLat[0]}&lon=${lonLat[1]}&limit=${1}&appid=${API_KEY_2}`;

  const cachedName = await caches.match(url);

  try {
    if (cachedName) {
      const cachedJSON = await cachedName.json();

      return { name: cachedJSON[0].name, country: cachedJSON[0].country };
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    } else {
      const cache = await caches.open("nameCache");
      cache.put(url, response.clone());
      const responseJSON = await response.json();

      return { name: responseJSON[0].name, country: responseJSON[0].country };
    }
  } catch (error) {
    // fetchData("116.10685,-8.5837726");
    handleError(error);
  }
}

async function getLonLat(location) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY_2}`;

  try {
    const cachedLocation = await caches.match(url);
    //
    if (cachedLocation) {
      const cachedJSON = await cachedLocation.json();
      if (cachedJSON[0] === undefined) {
        throw new Error(`Not a city`);
      }

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
      if (responseJSON[0] === undefined) {
        throw new Error(`Not a city`);
      }
      const lat = responseJSON[0].lat;
      const lon = responseJSON[0].lon;

      return [lon, lat];
    }
  } catch (error) {
    // fetchData("116.10685,-8.5837726");
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

  const cachedResponse = await caches.match(url);

  if (cachedResponse) {
    const cachedJSON = await cachedResponse.json();
    if (cachedJSON.days[0].datetime === currentDate) {
      renderWebIcon(cachedJSON);
      renderCurrentWeather(cachedJSON);
      renderDailyForecast(cachedJSON);
      renderForecast(cachedJSON);
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
      renderWebIcon(responseJSON);
      renderCurrentWeather(responseJSON);
      renderDailyForecast(responseJSON);
      renderForecast(responseJSON);
      showMap([responseJSON.longitude, responseJSON.latitude]);
    }
  } catch (error) {
    // fetchData("116.10685,-8.5837726");
    handleError(error);
  }
}

async function worldForecast(locationName) {
  let url = ``;
  const locationByLonLat = await getLonLat(locationName);

  const worldData = JSON.parse(localStorage.getItem("worldForecast")) || [];

  url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?key=${API_KEY}`;

  const currentDate = new Date().toISOString().split("T")[0];

  // const currentDate = "2024-10-30";

  const cachedResponse = await caches.match(url);

  if (cachedResponse) {
    const cachedJSON = await cachedResponse.json();
    if (cachedJSON.days[0].datetime === currentDate) {
      console.log(worldData);
      return;
    }
  }
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    } else {
      const cache = await caches.open("worldCache");
      cache.put(url, response.clone());
      const responseJSON = await response.json();
      const cityName = await getCityName([
        locationByLonLat[1],
        locationByLonLat[0],
      ]);
      console.log("New Cache");
      console.log(responseJSON.days[0].icon);
      tempConverter();
      const newData = {
        icon: responseJSON.currentConditions.icon,
        city: cityName.name,
        country: cityName.country,
        temp: tempConverter(responseJSON.currentConditions.temp),
        humidity: responseJSON.currentConditions.humidity,
      };
      worldData.push(newData);

      localStorage.setItem("worldForecast", JSON.stringify(worldData));
      // store to local storage
    }
  } catch (error) {
    console.log(error);
  }
}

export { fetchData, getLonLat, getCityName, worldForecast };
