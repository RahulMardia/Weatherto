import React, { useEffect, useState } from "react";
import TodayAt from "../components/WeatherApp/TodayAt/TodayAt";
import TodayHighlight from "../components/WeatherApp/TodayHighlight/TodayHighlight";
import DayForecast from "../components/WeatherApp/5DayForecast/DayForecast";
import Navbar from "../components/Navbar/Navbar";
import CurrentWeather from "../components/WeatherApp/CurrentWeather/CurrentWeather";
import "./Home.css";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Home = () => {
  const [search, setSearch] = useState("Delhi");
  const [loading, setLoading] = useState(false); // Added loading state

  const [data, setData] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const [daysData, setDaysData] = useState(null);
  const [airData, setAirData] = useState(null);

  const handleSearchSubmit = (searchData) => {
    setSearch(searchData);
  };

  const filterData = (list) => {
    const currentDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

    const uniqueDays = [];

    return list.filter((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });

      if (date !== currentDate && !uniqueDays.includes(date)) {
        uniqueDays.push(date);
        return true;
      }

      return false;
    });
  };

  useEffect(() => {
    setLoading(true); // Set loading to true when making the API call

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false); // Set loading to false after the API call completes
      });
  }, [search]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((response) => {
        const filteredData = filterData(response.data.list);
        setTimeData(response.data.list);
        setDaysData(filteredData);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
      .then((res) => {
        const lat = res.data[0].lat;
        const lon = res.data[0].lon;

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
          )
          .then((response) => {
            setAirData(response.data);
          })
          .catch((error) => console.log(error))
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((err) => console.log(err));
  }, [search]);

  return (
    <div className="home">
      <Navbar handleSearchSubmit={handleSearchSubmit} />
      {loading ? (
        <Loader />
      ) : data && airData && timeData && daysData ? (
        <div className="containerDivider">
          <div className="containerDivider">
            <div className="leftContainer">
              <CurrentWeather data={data} />
              <p className="forecastText">5 Days Forecast</p>
              <DayForecast data={daysData} />
            </div>

            <div className="rightContainer">
              <TodayHighlight airData={airData} data={data} />
              <p className="todayText">Today at</p>
              <TodayAt timeData={timeData} data={data} />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
