import { icons } from "./assets";

function attachDailyForecastIcon() {
  const container = document.querySelectorAll(".hourly-icon");
  container.forEach((iconContainer) => {
    const iconName = iconContainer.className.split(" ")[2];
    // console.log(iconName);
    iconContainer.src = icons()[`${iconName}`];
  });
}

export { attachDailyForecastIcon };
