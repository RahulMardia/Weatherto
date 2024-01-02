import React from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ data }) => {
  return (
    <div className="main-container">
      <div className="cardContainer">
        <h3 className="nowText">Now</h3>

        <div className="temp-container">
          <h1 className="current-temp">
            {Math.round(data?.main?.temp - 273.15)}&deg;<sup>c</sup>
          </h1>
          <img
            src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
            alt="image"
            className="currentWeatherImage"
          />
        </div>
        <p className="weather-info">{data?.weather[0]?.description}</p>
        <hr />
        <p className="dateText">
          <i className="fa-regular fa-calendar favicon"></i>{" "}
          {new Date(data?.dt * 1000).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            weekday: "long",
          })}
        </p>
        <p className="locationText">
          <i className="fa-solid fa-location-dot favicon"></i>
          {data?.name}, {data?.sys?.country}
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
