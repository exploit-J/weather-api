import React from "react";

const WeatherImg = ({ weather }) => {
  const condition = weather?.weather[0].id;
  if (condition >= 200 && condition <= 232) {
    return <img src={`${process.env.PUBLIC_URL}/assets/storm.jpg`} />;
  } else if (condition >= 300 && condition <= 531) {
    return <img src={`${process.env.PUBLIC_URL}/assets/rain.jpg`} />;
  } else if (condition >= 600 && condition <= 622) {
    return <img src={`${process.env.PUBLIC_URL}/assets/snow.jpg`} />;
  } else if (condition >= 701 && condition <= 781) {
    return <img src={`${process.env.PUBLIC_URL}/assets/mist.jpg`} />;
  } else if (condition == 800) {
    return <img src={`${process.env.PUBLIC_URL}/assets/clear.jpg`} />;
  } else if (condition >= 801 && condition <= 804) {
    return <img src={`${process.env.PUBLIC_URL}/assets/cloud.jpg`} />;
  }
};

export default WeatherImg;
