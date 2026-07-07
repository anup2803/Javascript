BASE_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,wind_speed_10m";

//Task 1
const response = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) {
      resolve({
        message: "System Ready",
      });
    } else {
      reject({
        message: "Data is missing",
      });
    }
  }, 2000);
});

response
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

//Taks 2

const res = fetch(BASE_URL);

res
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log("Task 2");
    console.log(data.current_weather);
  })
  .catch((err) => {
    console.log(err);
  });

//Taks 3

const response3 = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    console.log(data.current_weather);
    console.log("Task 3");
    console.log("Data fetch using async and await ");
  } catch (error) {
    console.log(error);
  }
};

response3();

// Part 2  Array-Centric Functions
//task 4

const fetchApi = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    const arr = data.hourly.time.map((time, index) => {
      return {
        time: time,
        temperature: data.hourly.temperature_2m[index],
      };
    });
    console.log("Task 4");
    console.log(arr);
  } catch (error) {
    console.log(error);
  }
};

fetchApi();

//task 5
const fetchApi1 = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    const arr = data.hourly.time.map((time, index) => {
      return {
        time: time,
        temperature: data.hourly.temperature_2m[index],
      };
    });
    const filterData = arr.filter((m) => {
      return m.temperature > 20;
    });
    console.log("Task 5");
    console.log(filterData);
  } catch (error) {
    console.log(error);
  }
};

fetchApi1();

//task 6
const fetchApi2 = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    const arr = data.hourly.time.map((time, index) => {
      return {
        time: time,
        temperature: data.hourly.temperature_2m[index],
      };
    });

    const cold_waether = arr.find((cold) => {
      return cold.temperature < 10;
    });
    console.log(cold_waether);
    console.log("Task 6");
  } catch (error) {
    console.log(error);
  }
};

fetchApi2();

//Part 3: Advanced Promises & Control Flow
//Task 7

const LONDON_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=-0.11&current_weather=true";

const PARIS_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true";

fetch(LONDON_URL)
  .then((res) => res.json())
  .then((londonData) => {
    fetch(PARIS_URL)
      .then((res) => res.json())
      .then((parisData) => {
        const londonTemp = londonData.current_weather.temperature;
        const parisTemp = parisData.current_weather.temperature;
        console.log("Task 7");
        console.log(`London Temp : ${londonTemp}`);
        console.log(`Paris Temp : ${parisTemp}`);
      });
  });

//task 8
const fetchApi3 = async () => {
  try {
    const londonRes = await fetch(LONDON_URL);
    const londonData = await londonRes.json();
    const parisRes = await fetch(PARIS_URL);
    const parisData = await parisRes.json();

    const londonTemp = londonData.current_weather.temperature;
    const parisTemp = parisData.current_weather.temperature;
    console.log("Task 8");
    console.log(`London Temp : ${londonTemp}`);
    console.log(`Paris Temp : ${parisTemp}`);
  } catch (err) {
    console.log(err);
  }
};

fetchApi3();

//Task 9

const TOKYO_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&current_weather=true";

const NEW_YORK_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true";

const SYDNEY_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&current_weather=true";

const fetchCities = async () => {
  try {
    const res = await Promise.all([
      fetch(TOKYO_URL),
      fetch(NEW_YORK_URL),
      fetch(SYDNEY_URL),
    ]);
    const data = await Promise.all(res.map((m) => m.json()));
    const [tokyoData, newYorkData, sydneyData] = data;
    console.log("Task 9");
    console.log(tokyoData.current_weather);
    console.log(newYorkData.current_weather);
    console.log(sydneyData.current_weather);
  } catch (error) {
    console.log(error);
  }
};

fetchCities();

//Task 10
// const TOKYO_URL =
//   "https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.69&current_weather=true";

// const NEW_YORK_URL =
//   "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true";

// const SYDNEY_URL =
//   "https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21&current_weather=true";

const weatherPipeline = async () => {
  try {
    const res = await Promise.all([
      fetch(TOKYO_URL),
      fetch(NEW_YORK_URL),
      fetch(SYDNEY_URL),
    ]);
    const data = await Promise.all(res.map((m) => m.json()));

    const formatedData = data.map((city, index) => {
      return {
        id: index + 1,
        currentTemp: city.current_weather.temperature,
        windSpeed: city.current_weather.windspeed,
      };
    });

    console.log(formatedData);

    const windyCity = formatedData.find((city) => {
      return city.windSpeed > 5;
    });
    console.log("Task 10");
    console.log(windyCity);
  } catch (error) {
    console.log(error);
  }
};

weatherPipeline();
