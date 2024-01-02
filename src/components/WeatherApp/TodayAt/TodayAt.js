import React from "react";
import "./TodayAt.css";
import image from "../../../assets/images/direction.png";
const TodayAt = ({ timeData, data }) => {
  return (
    <div className="mainContainer">
      <div className="bigContainer">
        {timeData?.slice(0, 9).map((item) => (
          <div className="smallContainer" key={item.dt}>
            <p>
              {new Date(item.dt_txt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt=""
              className="todayWeatherImage"
              style={{ height: "50px", width: "50px", margin: "auto" }}
            />
            <p>
              {Math.round(item?.main?.temp - 273.15)}&deg;<sup>c</sup>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayAt;
