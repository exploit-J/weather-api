/* eslint-disable */
import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
import WeatherImg from "./component/WeatherImg";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [apiError, setAPIError] = useState("");
  const cities = ["Seoul", "Paris", "Tokyo", "New York", "Oslo", "Cheonan"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrntLocation(lat, lon);
    });
  };

  const getWeatherByCurrntLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();
      if (data.cod !== 200) {
        throw new Error(
          alert("도시명을 정확히 입력해 주세요.(영문만 / 대,소문자 구분X.)")
        );
      }
      setWeather(data);
      console.log(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city == "") {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
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
      ) : !apiError ? (
        <div className="contents-box">
          <WeatherBox
            weather={weather}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setCity={setCity}
          />
          <WeatherButton cities={cities} setCity={setCity} city={city} />
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
