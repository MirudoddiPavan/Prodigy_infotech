var searchEl = document.querySelector("#search_btn");
var inputEl = document.querySelector(".input");
var clearEl = document.querySelector("#clear_search");
var recentEl = document.querySelector("#recent_cities");
var dailyEl = document.querySelector("#daily_city");
var dayTempEl = document.querySelector("#daily_temp");
var dayHumidityEl = document.querySelector("#daily_humidity");
var dayWindEl = document.querySelector("#daily_wind");
var dayUVEl = document.querySelector("#daily_uv");
var dayIcon = document.querySelector(".daily-icon");
var APIKey = "237d2dfde4a0e93ba29a4167915f9688";

// Date
var currentDay = moment().format("dddd l");
$(".date").text(currentDay);

// Clock
let clock = document.querySelector(".clock");
setInterval(function () {
  let date = new Date();
  clock.innerHTML = date.toLocaleTimeString();
}, 1000);



// Search Button
searchEl.addEventListener("click", function () {
  let city = inputEl.value;
  let currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=imperial`;
  let forcastUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;
  fetch(currentUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      dailyEl.textContent = data.name;
      dayTempEl.textContent = data.main.temp;
      dayHumidityEl.textContent = data.main.humidity;
      dayWindEl.textContent = data.wind.speed;
      let weatherPic = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      dayIcon.setAttribute("src", weatherPic);
    });
});

