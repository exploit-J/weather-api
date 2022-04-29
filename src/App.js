/* eslint-disable */

import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
import WeatherImg from "./component/WeatherImg";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  let [loading, setLoading] = useState(false);
  const cities = ["Paris", "Tokyo", "Seoul", "New York", "Oslo", "Cheonan"];
  const [searchValue, setSearchValue] = useState("");

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrntLocation(lat, lon);
    });
  };

  const getWeatherByCurrntLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5d487a5114b9f465148c42e6e9dc2278&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5d487a5114b9f465148c42e6e9dc2278&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className="container">
      <div className="back-img">
        <WeatherImg weather={weather} />
      </div>
      {loading ? (
        <div className="contents-box">
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="contents-box">
          <WeatherBox
            weather={weather}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setCity={setCity}
          />
          <WeatherButton cities={cities} setCity={setCity} city={city} />
          <ClipLoader color="#f88c6b" loading={loading} size={150} />
        </div>
      )}
    </div>
  );
}

export default App;
