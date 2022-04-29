import React from "react";

const WeatherButton = ({ cities, setCity, city }) => {
  return (
    <div className="button-wrapper">
      <button
        className={`${city == "" ? "button active" : "button"}`}
        onClick={() => {
          setCity("");
        }}
      >
        현재위치
      </button>
      {cities.map((item, i) => (
        <button
          className={`${city == item ? "button active" : "button"}`}
          key={i}
          onClick={() => {
            setCity(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default WeatherButton;
