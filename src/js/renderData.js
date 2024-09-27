// Data list
// Country, city, date
// temperature now  , max min, feels like
// Humidity, chance of rain
// wind speed, uv index
//

// Get for current weather, display in the main div
// Get the 24H weather, append using for each, display to a div

// Forecast for the next 10 days

// Use another API for location (If possible)

function renderData(data) {
  const location = data.resolvedAddress.split(",");
  const country = location[0];
  const city = location[1].trim();
  const date = data.days["0"].datetime;
  const temp = data.temp;
  const maxTemp = data.days["0"].tempmax;
  const minTemp = data.days["0"].tempmin;
  const feelsLike = data.feelslike;
  const humidity = data.humidity;
  const chanceOfRain = data.precipprob;
  const windSpeed = data.windspeed;
  const uvIndex = data.uvindex;

  console.log(data);
}

export { renderData };
