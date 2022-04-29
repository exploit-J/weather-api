/* eslint-disable */

import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";
import WeatherImg from "./component/WeatherImg";

// 1. 앱이 실행되면 현재 위치기반의 날씨가 보인다
// 2. 날씨정보에는 현재 도시, 섭씨, 화씨온도, 날씨상태가 있다
// 3. 5개의 버튼(1개는 현재위치, 4개는 다른도시)
// 4. 다른 도시 버튼 클릭 시 해당 도시 날씨정보 표시
// 5. 현재위치 버튼을 누르면 현재위치 기반 날씨정보가 표시된다
// 6. 데이터 가져오는동안 로딩 스피너가 돈다.

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
