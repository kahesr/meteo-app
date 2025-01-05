function displayCurrentTemp(response) {
  let city = response.data.city;
  let temperature = response.data.temperature.current;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let weatherCondition = response.data.condition.description;
  let iconImage = `<img src=${response.data.condition.icon_url} alt="" class="icon">`;
  let latitude = response.data.coordinates.latitude;
  let longitude = response.data.coordinates.longitude;
  let windUnit = currentUnit === "metric" ? " km/h" : " mph";

  document.querySelector("#city").innerHTML = city;
  document.querySelector("#current-temp").innerHTML = Math.round(temperature);
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(wind)}${windUnit}`;
  document.querySelector("#weather-description").innerHTML = weatherCondition;
  document.querySelector("#icon").innerHTML = iconImage;

  // GeoTZ.find(latitude, longitude).then(getTimezone);
  getTimezone(latitude, longitude);

  getForcast(response.data.city);
}

// function getTimezone(response) {
//   let timezone = response[0]; //Outputs: Europe / Paris;
//   let time = moment().tz(timezone).format("dddd h:mm A"); //Outputs: Sunday 1:41 AM
//   document.querySelector("#time").innerHTML = time;
// }
async function getTimezone(latitude, longitude) {
  try {
    let result = await GeoTZ.find(latitude, longitude);
    let timezone = result[0]; //Outputs: Europe / Paris;
    let time = moment().tz(timezone).format("dddd h:mm A"); //Outputs: Sunday 1:41 AM
    document.querySelector("#time").innerHTML = time;
  } catch (error) {
    console.error("Error fetching timezone:", error);
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForcast(response) {
  let forcast = document.querySelector("#forcast");
  let dailyForcast = response.data.daily; //array of 7 days
  forcast.innerHTML = "";

  dailyForcast.forEach(function (weekDay, index) {
    if (index < 5) {
      let highTemp = Math.round(weekDay.temperature.maximum);
      let lowTemp = Math.round(weekDay.temperature.minimum);
      let icon = `<img src=${weekDay.condition.icon_url} alt="" class="icon">`;
      let day = formatDay(weekDay.time);

      // Add the "today" class to the first container
      let todayClass = index === 0 ? " today" : "";

      forcast.innerHTML += `<div class="day-forcast-container${todayClass}">
    <div class="day">${day}</div>
    <div>${icon}</div>
    <div class="temps">
    <span class="temp highestTemp">${highTemp}°</span>
    <span class="temp loestTemp">${lowTemp}°</span>
    </div>
    </div>`;
    }
  });
}

function getForcast(city) {
  let apiKey = "taf74bb8e045996263fo9880fc8a042e";
  let apiBase = "https://api.shecodes.io/weather/v1/forecast";
  let forcastApiUrl = `${apiBase}?query=${city}&key=${apiKey}&units=${currentUnit}`;
  axios.get(forcastApiUrl).then(displayForcast);
}

function searchCity(city) {
  let apiKey = "taf74bb8e045996263fo9880fc8a042e";
  let apiBase = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiBase}?query=${city}&key=${apiKey}&units=${currentUnit}`;
  axios.get(apiUrl).then(displayCurrentTemp);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let formInput = document.querySelector("#form-input");
  currentCity = formInput.value;
  searchCity(currentCity);
}

function switchUnit(unit) {
  if (unit === "metric") {
    celsiusButton.classList.add("selectedUnit");
    fahrenheitButton.classList.remove("selectedUnit");
  } else {
    celsiusButton.classList.remove("selectedUnit");
    fahrenheitButton.classList.add("selectedUnit");
  }

  currentUnit = unit;
  searchCity(currentCity);
}
//////////////////////////////////////////
let currentUnit = "metric";
let currentCity = "Paris";
let celsiusButton = document.querySelector("#celsius");
let fahrenheitButton = document.querySelector("#fahrenheit");
let form = document.querySelector("#form");

searchCity(currentCity);

celsiusButton.addEventListener("click", () => switchUnit("metric"));
fahrenheitButton.addEventListener("click", () => switchUnit("imperial"));

form.addEventListener("submit", handleSearchSubmit);
