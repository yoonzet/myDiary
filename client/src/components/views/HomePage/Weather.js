import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { FaLocationArrow } from "react-icons/fa";
import { WiRaindrop, WiStrongWind } from "react-icons/wi";

dayjs.locale("ko");
export default function Weather() {
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [speed, setSpeed] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const today = dayjs().format("MM월 DD일 (ddd) A h:mm");

  function handleGeo(position) {
    const latitude = position.coords.latitude; // 경도
    const longitude = position.coords.longitude; // 위도

    getWeather(latitude, longitude);
  }

  function handleGeoErr(err) {
    alert("위치정보를 찾을 수 없습니다.");
    console.log("geo err! " + err);
  }

  function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleGeo, handleGeoErr);
  }

  function getWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const temp = Math.ceil(data.main.temp);
        const humidity = Math.ceil(data.main.humidity);
        const speed = Math.ceil(data.wind.speed);
        const weatherIconData = data.weather[0].icon;
        setTemp(temp);
        setHumidity(humidity);
        setSpeed(speed);
        setWeatherIcon(
          `http://openweathermap.org/img/wn/${weatherIconData}@2x.png`
        );
      });
  }

  useEffect(() => {
    requestCoords();
  }, []);

  return (
    <div className="weather_wrap">
      <p>{today}</p>

      <div className="main_weather">
        <FaLocationArrow />
        <h1>{temp}°</h1>
        <img src={weatherIcon} alt="" />
      </div>
      <div>
        <div className="etc_weather">
          <div>
            <WiRaindrop className="icon" />
            <>
              <p>습도</p>
              {humidity}%
            </>
          </div>
          <div>
            <WiStrongWind className="icon" />
            <>
              <p>풍속</p>
              {speed}m/s
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
