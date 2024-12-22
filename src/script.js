function displayCurrentTemp(response) {
  let city = response.data.city;
  let temperature = response.data.temperature.current;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  let weatherCondition = response.data.condition.description;
  let iconImage = `<img src=${response.data.condition.icon_url} alt="" class="icon">`;
  let date = new Date(response.data.time * 1000);

  document.querySelector("#city").innerHTML = city;
  document.querySelector("#current-temp").innerHTML = Math.round(temperature);
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${wind}km/h`;
  document.querySelector("#weather-description").innerHTML = weatherCondition;
  document.querySelector("#icon").innerHTML = iconImage;
  document.querySelector("#time").innerHTML = formatDate(date);

  getForcast(response.data.city);
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
  console.log(dailyForcast);

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

function getForcast(city) {
  let apiKey = "taf74bb8e045996263fo9880fc8a042e";
  let forcastApi = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(forcastApi).then(displayForcast);
}

function searchCity(city) {
  let apiKey = "taf74bb8e045996263fo9880fc8a042e";
  let api = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(api).then(displayCurrentTemp);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let formInput = document.querySelector("#form-input");
  searchCity(formInput.value);
}

//////////////////////////////////////////
let form = document.querySelector("#form");
form.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
