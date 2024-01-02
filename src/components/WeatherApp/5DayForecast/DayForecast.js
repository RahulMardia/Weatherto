import React, { useEffect, useState } from "react";
import "./DayForecast.css";

const DayForecast = ({ data }) => {
  return (
    <div className="mainContainerForecast">
      {data?.map((item) => {
        return (
          <div className="days-container" key={item.dt}>
            <div className="img-container">
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt=""
                height="50"
                width="50"
              />
              <p className="days-deg">
                {Math.round(item?.main?.temp - 273.15)}&deg;
              </p>
            </div>
            <p className="days-date">
              {new Date(item.dt * 1000).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </p>
            <p className="days-day">
              {new Date(item.dt * 1000).toLocaleDateString("en-IN", {
                weekday: "long",
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DayForecast;
