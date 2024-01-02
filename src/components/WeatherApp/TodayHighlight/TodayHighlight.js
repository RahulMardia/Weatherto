import React from "react";
import "./TodayHighlight.css";
import { Thermometer, Eye, Moon, Sun, Wind } from "lucide-react";
import moment from "moment";

const TodayHighlight = ({ data, airData }) => {
  const cal = (timezone, sun) => {
    let time = timezone;
    let suntime = sun;

    let x = moment.utc(suntime, "X").add(time, "seconds").format("HH:mm a");
    return x;
  };

  return (
    <div className="highlightContainer">
      <p className="highlightText">Todays Highlights</p>
      <div className="topFlex">
        <div className="leftHighlightContainer">
          <div className="qualityFlex">
            <p className="aqText">Air Quality Index</p>
            {airData?.list[0]?.main?.aqi === 1 || 2 ? (
              <div className="good">
                <p>Good</p>
              </div>
            ) : (
              <div className="bad">
                <p>Bad</p>
              </div>
            )}
          </div>
          <div className="container">
            <Wind size={40} style={{ alignSelf: "center" }} />{" "}
            <div className="pmContainer">
              <p className="pmHeading">PM25</p>
              <p className="pmText">
                {Math.round(airData?.list[0].components.pm2_5)}
              </p>
            </div>
            <div className="pmContainer">
              <p className="pmHeading">SO2</p>
              <p className="pmText">
                {Math.round(airData?.list[0].components.so2)}
              </p>
            </div>
            <div className="pmContainer">
              <p className="pmHeading">NO2</p>
              <p className="pmText">
                {Math.round(airData?.list[0].components.no2)}
              </p>
            </div>
            <div className="pmContainer">
              <p className="pmHeading">O3</p>
              <p className="pmText">
                {Math.round(airData?.list[0].components.o3)}
              </p>
            </div>
          </div>
        </div>
        <div className="rightHighlightContainer">
          <p className="sunContainerText">Sunrise & Sunset</p>
          <div className="right-Container">
            <div className="sunriseContainer">
              <Sun size={45} className="icon" />
              <div className="sunriseContainerSet">
                <span className="sunText">Sunrise</span>
                <p className="sunTimeText">
                  {cal(data?.timezone, data?.sys?.sunrise)}
                </p>
              </div>
            </div>
            <div className="sunsetContainer">
              <Moon size={45} className="icon" />

              <div className="sunsetContainerSet">
                <span className="sunText">Sunset</span>
                <p className="sunTimeText">
                  {cal(data?.timezone, data?.sys?.sunset)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomFlex">
        <div className="firstContainer">
          <div className="humidityContainer">
            <span>Humidity</span>
            <div className="humiContainer">
              <svg
                className="svg-icon"
                style={{
                  width: "40px",
                  height: "40px",
                  verticalAlign: "middle",
                  fill: "currentColor",
                  overflow: "hidden",
                }}
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M512 1024c-190.4 0-345.6-158.4-345.6-352 0-8 0-17.6 1.6-27.2 1.6-28.8 8-57.6 16-83.2C248 332.8 476.8 43.2 486.4 32L512 0l24 30.4c9.6 12.8 238.4 302.4 304 531.2 8 25.6 14.4 54.4 16 83.2 1.6 9.6 1.6 19.2 1.6 27.2 0 193.6-155.2 352-345.6 352z m0-921.6c-60.8 81.6-217.6 302.4-267.2 476.8-8 24-12.8 46.4-14.4 70.4 0 8-1.6 16-1.6 22.4 0 160 126.4 289.6 283.2 289.6S795.2 832 795.2 672c0-6.4 0-12.8-1.6-20.8-1.6-24-6.4-48-12.8-68.8-51.2-177.6-208-398.4-268.8-480z" />
                <path d="M417.6 835.2c-4.8 0-11.2-1.6-16-4.8-14.4-9.6-19.2-28.8-11.2-43.2l188.8-313.6c9.6-14.4 28.8-19.2 43.2-11.2 14.4 9.6 19.2 28.8 11.2 43.2L444.8 820.8c-6.4 9.6-16 14.4-27.2 14.4zM417.6 616c-51.2 0-94.4-41.6-94.4-94.4s41.6-94.4 94.4-94.4 94.4 41.6 94.4 94.4-41.6 94.4-94.4 94.4z m0-126.4c-17.6 0-32 14.4-32 32s14.4 32 32 32 32-14.4 32-32-14.4-32-32-32zM606.4 867.2c-51.2 0-94.4-41.6-94.4-94.4 0-51.2 41.6-94.4 94.4-94.4 51.2 0 94.4 41.6 94.4 94.4 0 52.8-43.2 94.4-94.4 94.4z m0-124.8c-17.6 0-32 14.4-32 32s14.4 32 32 32 32-14.4 32-32-14.4-32-32-32z" />
              </svg>
              <p>{data?.main?.humidity}%</p>
            </div>
          </div>
          <div className="humidityContainer">
            <span>Pressure</span>
            <div className="humiContainer">
              <Wind size={40} style={{ alignSelf: "center" }} />{" "}
              <p>{data?.main?.pressure}hPa</p>
            </div>
          </div>
          <div className="humidityContainer">
            <span>Visibility</span>

            <div className="humiContainer">
              <Eye size={40} />

              <p>{Math.round(data?.visibility / 1000)}km</p>
            </div>
          </div>
          <div className="humidityContainer">
            <span>Feels Like</span>

            <div className="humiContainer">
              <Thermometer size={40} />
              <p>
                {Math.round(data?.main?.feels_like - 273.15)}&deg;
                <sup>c</sup>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayHighlight;
