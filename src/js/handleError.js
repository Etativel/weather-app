function handleError(error) {
  // const lastLocation = localStorage.getItem("lastLocation");
  // fetchData(lastLocation);
  alert("That is not a city");
  console.log(error);
  return;
}

export { handleError };
