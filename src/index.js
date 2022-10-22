function getADay() {
  //This function gets the current day
  let currentDate = new Date();
  let day = currentDate.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let displayDate = days[day];

  //console.log(displayDate)
  return displayDate;
}

function getTheTime() {
  //This function gets the current time
  let currentTime = new Date();
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  if (hour < "10") {
    hour = `0${hour}`;
  }

  if (minutes < "10") {
    minutes = `0${minutes}`;
  }

  let completeTime = `${hour}:${minutes}`;

  //  console.log(completeTime);
  return completeTime;
}

function dateAndTime() {
  //places date on the weather app
  let placeDate = document.querySelector("#date");
  placeDate.innerHTML = getADay();

  //places time on the weather app
  let placeTime = document.querySelector("#time");
  placeTime.innerHTML = getTheTime();
}

dateAndTime();

//selects serach bar, and listens for submit
let searchBar = document.querySelector("#search");
searchBar.addEventListener("submit", displayCity);

//selects the city element and injects data from search bar to city element
function displayCity(event) {
  event.preventDefault();
  let inputSearch = document.querySelector("#searchbox-input");
  let city = document.querySelector("#city");
  city.innerHTML = inputSearch.value;

  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch.value}&appid=${apiKey}&units=metric`;

  //takes weather from api call an injects into app
  function displayWeather(response) {
    // console.log(response);
    let weather = Math.round(response.data.main.temp);

    let largeDegree = document.querySelector("#degrees");
    largeDegree.innerHTML = weather;
  }

  axios.get(apiUrl).then(displayWeather);
}

//calls geolocation, and get longitude and latitude
function getLocation() {
  navigator.geolocation.getCurrentPosition(displayLocation);

  //put longitude and latitude in weather api call
  function displayLocation(position) {
    //console.log(response);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    //get longtitude and latitude api response, and inject city and weather to weather app
    function changeCurrentCityDegree(response) {
      console.log(response);
      let temp = response.data.main.temp;

      let largeDegree = document.querySelector("#degrees");
      largeDegree.innerHTML = Math.round(temp);

      let cityName = document.querySelector("#city");
      cityName.innerHTML = response.data.name;
      console.log(cityName);
    }

    //api call for longitude and latitude
    let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
    let apiLatLonUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiLatLonUrl).then(changeCurrentCityDegree);
  }
}

//selects current weather button
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);
