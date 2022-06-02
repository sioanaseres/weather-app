const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const apikey = "4c4caa8a02c3e53614a22a6caa77812d";
const url = (city, key) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
async function getWeatherByLocation(city) {
  const resp = await fetch(url(city));
  const respData = await resp.json();
  console.log(respData);
  addWeatherToPage(respData);
}

// getWeatherByLocation("London");

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");
  weather.innerHTML = `

  <h2>${temp}°C   <img src="https://api.openweathermap.org/img/w/${data.weather[0].icon}.png"/></h2>

  <small>in ${search.value}</small>
  <small>in ${data.weather[0].main}</small>
  
  `;

  //clean main
  main.innerHTML = "";
  main.appendChild(weather);
}
function KtoC(K) {
  return (K - 273.15).toFixed(1);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = search.value;
  if (city) {
    getWeatherByLocation(city);
  }
});
