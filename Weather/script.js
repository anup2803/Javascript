const apiKey = "da5cc509bc967933cf9f957a7a06eb9b"; // Replace with a valid API key

// //track the locations
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getCurrentWeather(null, lat, lon);
        getForecast(null, lat, lon);
      },
      (error) => {
        console.log(error.message);

        getCurrentWeather("Kathmandu");
        getForecast("Kathmandu");
      },
    );
  } else {
    alert("Geolocation is not supported by this browser.");

    getCurrentWeather("Kathmandu");
    getForecast("Kathmandu");
  }
});

//fetch the api
async function getCurrentWeather(city = null, lat = null, lon = null) {
  let url;

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  }

  const response = await fetch(url);
  const data = await response.json();
  console.log(data.main);

  if (data.cod != 200) {
    alert("City not found");
    return;
  }

  // Update UI
  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temperature").innerText =
    `${Math.round(data.main.temp)}°C`;
  document.getElementById("humidity").innerText = `${data.main.humidity}%`;
  document.getElementById("description").innerText =
    data.weather[0].description;
  document.getElementById("wind").innerText = `${data.wind.speed} m/s`;
  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  changeTheme(data.main.temp, data.weather[0].main);
}
//input search and call the functions to fecth api

const cityInput = document.getElementById("cityInput");

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();

    if (!city) return;

    getCurrentWeather(city);
    getForecast(city);

    cityInput.value = "";
  }
});

//getforcast
async function getForecast(city = null, lat = null, lon = null) {
  let url;

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.cod != 200) {
    alert("City not found");
    return;
  }

  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";

  const dailyForcast = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  dailyForcast.slice(0, 3).forEach((day) => {
    const date = new Date(day.dt_txt);

    const dayName = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    forecastContainer.innerHTML += `
  <div class="small-cards">

        <img
          class="forecast-icon"
          src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
        >

        <h3>${dayName}</h3>

        <h2>${Math.round(day.main.temp)}°C</h2>

        <p>${day.weather[0].main}</p>

      </div>
  
  `;
  });
}

function changeTheme(temp, weather) {
  const body = document.body;

  weather = weather.toLowerCase();

  if (weather.includes("rain") || weather.includes("drizzle")) {
    body.style.backgroundImage = "url('images/raining_weather.jpg')";
  } else if (weather.includes("snow")) {
    body.style.backgroundImage = "url('images/cold_weather.jpg')";
  } else if (temp < 22) {
    body.style.backgroundImage = "url('images/good_weather.jpg')";
  } else if (temp < 30) {
    body.style.backgroundImage = "url('images/warm_weather.jpg')";
  } else {
    body.style.backgroundImage = "url('images/hot_weather.jpg')";
  }
}
