import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");

  const [moreInfo, setMoreInfo] = useState(false);

  const [temp, setTemp] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");

  const [currentTempunit, setCurrentTempunit] = useState("Fahrenhit");

  const getData = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d37478d757fb396c7fe12e01499576c`
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const { data } = await getData(city);
    setWeatherData(data);
    setTemp(data.main.temp);
    setCurrentWeather(data.weather[0].main);
    setMoreInfo(false);
  };

  const convertTemp = () => {
    if (currentTempunit == "Fahrenhit") {
      const tempInCelcius = (temp - 32) * (5 / 9);
      setTemp(tempInCelcius);
      setCurrentTempunit("Celcius");
    } else if (currentTempunit == "Celcius") {
      const tempInFahrenhit = (9 / 5) * temp + 32;
      setTemp(tempInFahrenhit);
      setCurrentTempunit("Fahrenhit");
    }
  };

  return (
    <div>
      <label for="city">City : </label>
      <input
        id="city"
        type="text"
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Get Weather Report</button>

      <br />
      <br />
      <br />

      {Object.keys(weatherData).length > 0 ? (
        <>
          <h4>Temperature : {temp}</h4>
          <button onClick={convertTemp}>
            Convert to
            {currentTempunit == "Fahrenhit" ? " Celcius " : " Fahrenhit "}
          </button>
          <br />
          <br />
          <h4>CountryCode : {weatherData.sys.country}</h4>
          <br />
          <h4>City Name : {weatherData.name}</h4>
          <br />
          <h4>Description : {weatherData.weather[0].description}</h4>
          <br />
          <button onClick={() => setMoreInfo(true)}>
            Get More Information
          </button>
          <br />
          {moreInfo ? (
            <>
              <h4>Humidity : {weatherData.main.humidity}</h4>
              <br />
              <h4>Wind Speed : {weatherData.wind.speed}</h4>
              <br />
              <h4>Min Temp : {weatherData.main.temp_min}</h4>
              <br />
              <h4>Max Temp : {weatherData.main.temp_max}</h4>
            </>
          ) : (
            ""
          )}
          <br />
          <Image
            height={20}
            width={20}
            alt="Icon of weather"
            src={
              currentWeather == "smoke"
                ? "/smoky.png"
                : currentWeather !== "cloudy"
                ? "/cloudy.png"
                : currentWeather !== "clear sky"
                ? "/sun.webp"
                : ""
            }
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Weather;
