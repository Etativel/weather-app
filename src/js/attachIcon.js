import { icons } from "./assets";

function attachDailyForecastIcon() {
  const container = document.querySelectorAll(".hourly-icon");
  console.log(container);
  container.forEach((iconContainer) => {
    const iconName = iconContainer.className.split(" ")[2];
    // console.log(iconName);
    iconContainer.src = icons()[`${iconName}`];
    console.log("cnt");
  });
}

export { attachDailyForecastIcon };
