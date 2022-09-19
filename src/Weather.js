import React, { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function Weather() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState("");
  let [description, setDescription] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [icon, setIcon] = useState("");

  let [render, setRender] = useState("");

  function handleCity(event) {
    setCity(event.target.value);
  }

  function showWeather(response) {
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    setRender(
      <ul>
        <li>Temperature: {Math.round(temperature)}˚C</li>
        <li> Description: {description}</li>
        <li> Humidity: {humidity}%</li>
        <li> Wind: {Math.round(wind)} km/hr</li>
        <li>
          <img src={weatherIcon} alt="weather-icon" />
        </li>
      </ul>
    );
  }

  let apiKey = "5f927ad8cdc7b7c47b620fc64e34c6d6";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);

  if (city) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a city"
            onChange={handleCity}
          ></input>
          <input type="submit" value="Submit"></input>
        </form>
        <div>{render}</div>
      </div>
    );
  } else {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Enter a city"
            onChange={handleCity}
          ></input>
          <input type="submit" value="Submit"></input>
        </form>
        <div>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      </div>
    );
  }
}
