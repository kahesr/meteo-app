function handleApi(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.temperature.current
  );
}

function searchCity(city) {
  let apiKey = "taf74bb8e045996263fo9880fc8a042e";
  let api = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(api).then(handleApi);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let formInput = document.querySelector("#form-input");
  searchCity(formInput.value);
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
