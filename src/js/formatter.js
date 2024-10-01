class SelectedTemperature {
  constructor() {
    this.currentUnit = false;
  }
  setTemperature(selectedUnit) {
    this.currentUnit = selectedUnit;
  }
  getTemperature() {
    return this.currentUnit;
  }
}

const selectedTemperature = new SelectedTemperature();

function tempConverter(temp) {
  const getSelectedUnit = selectedTemperature.getTemperature();
  if (getSelectedUnit === true) {
    return Math.ceil((temp - 32) * (5 / 9));
  } else {
    return Math.ceil(temp);
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  return `${weekday}, ${day} ${month} ${year}`;
}

function formatTimeToAMPM(timeString) {
  const [hours] = timeString.split(":");
  let hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour} ${ampm}`;
}

export { formatDate, formatTimeToAMPM, selectedTemperature, tempConverter };
