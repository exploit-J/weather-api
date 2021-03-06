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
        νμ¬μμΉ
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
