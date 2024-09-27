import { renderData } from "./renderData";
import { handleError } from "./handleError";

const API_KEY = "SZFVC4TUXTGQS4SH6F48GUNEG";

async function fetchData(location) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status ${response.status}`);
    }
    const responseJSON = await response.json();
    renderData(responseJSON);
  } catch (error) {
    handleError(error);
  }
}

export { fetchData };
