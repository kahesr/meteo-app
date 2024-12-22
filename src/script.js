function handleApi(response) {
  let city = response.data.city;
  let temperature = response.data.temperature.current;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let weatherCondition = response.data.condition.description;
  let iconImage = `<img src=${response.data.condition.icon_url} alt="">`;
  let date = new Date(response.data.time * 1000);

  document.querySelector("#city").innerHTML = city;
  document.querySelector("#current-temp").innerHTML = Math.round(temperature);
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${wind}km/h`;
  document.querySelector("#weather-description").innerHTML = weatherCondition;
  document.querySelector("#icon").innerHTML = iconImage;
  document.querySelector("#time").innerHTML = formatDate(date);
}

function displayForcast() {
  let forcast = document.querySelector("#forcast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];

  days.forEach(function (day) {
    forcast.innerHTML += `<div class="day-forcast-container">
    <div class="day forcastDetail">${day}</div>
    <div class="icon forcastDetail">🌦️</div>
    <div class="temps forcastDetail">
    <span class="temp highestTemp">15°</span>
    <span class="temp loestTemp">9°</span>
    </div>
    </div>`;
  });
}

function searchCity(city) {
  let apiKey = "taf74bb8e045996263fo9880fc8a042e";
  let api = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(api).then(handleApi);

  //let forcastApi = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  //axios.get(forcastApi).then(handleForcastApi);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let formInput = document.querySelector("#form-input");
  searchCity(formInput.value);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}

//////////////////////////////////////////
let form = document.querySelector("#form");
form.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");

displayForcast();
