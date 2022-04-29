import React from "react";

// destructuring 문법
const WeatherBox = ({ weather, searchValue, setSearchValue, setCity }) => {
  return (
    <div className="weather-box">
      <div className="weather-search">
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          type="text"
          maxLength={20}
        ></input>
        <button
          onClick={() => {
            setCity(searchValue);
          }}
        >
          Search
        </button>
      </div>
      <div className="weather-contents">
        {/* weather && weather.name 삼항식으로 간소화 */}
        <div>
          {/* <h5>City</h5> */}
          <h3 className="title-country">{weather?.sys.country}</h3>
          <h1 className="title-city">{weather?.name}</h1>
          {/* <h5>Country</h5> */}
        </div>
        <h2 className="temp c">
          {/* 섭씨를 화씨로 변환 = 섭씨 * 1.8 + 32 */}
          {weather?.main.temp}℃
        </h2>
        <h4 className="temp f">
          ( {(weather?.main.temp * 1.8 + 32).toFixed(2)}℉ )
        </h4>
        <h3 className="condition">{weather?.weather[0].main}</h3>
      </div>
    </div>
  );
};

export default WeatherBox;
