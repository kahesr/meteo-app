function handleSearchSubmit(event) {
  event.preventDefault();
  let formInput = document.querySelector("#form-input");
  let cityName = document.querySelector("#city");
  cityName.innerHTML = formInput.value;
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSearchSubmit);
