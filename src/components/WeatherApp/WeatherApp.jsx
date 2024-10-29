import React, { useState, useRef } from 'react';
import './WeatherApp.css';
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
    const api_key = "56b67868b074c6fa7fe9507ad526a452";
    const [wicon, setWicon] = useState(cloud_icon);
    const [humidity, setHumidity] = useState("64%");
    const [wind, setWind] = useState("18 km/h");
    const [temperature, setTemperature] = useState("24°C");
    const [location, setLocation] = useState("London");

    const inputRef = useRef();

    const search = async () => {
        const city = inputRef.current.value.trim();
        if (!city) return;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
        const response = await fetch(url);
        const data = await response.json();

        setHumidity(`${data.main.humidity} %`);
        setWind(`${Math.floor(data.wind.speed)} km/h`);
        setTemperature(`${Math.floor(data.main.temp)} °c`);
        setLocation(data.name);

        const icon = data.weather[0].icon;
        if (icon === "01d" || icon === "01n") setWicon(clear_icon);
        else if (["02d", "02n"].includes(icon)) setWicon(cloud_icon);
        else if (["03d", "03n", "04d", "04n"].includes(icon)) setWicon(drizzle_icon);
        else if (["09d", "09n", "10d", "10n"].includes(icon)) setWicon(rain_icon);
        else if (["13d", "13n"].includes(icon)) setWicon(snow_icon);
        else setWicon(clear_icon);
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input ref={inputRef} type="text" className="cityInput" placeholder='Enter city' />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="Search" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="Weather Icon" />
            </div>
            <div className="weather-temp">{temperature}</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="Humidity Icon" className="icon" />
                    <div>{humidity}</div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="Wind Icon" className="icon" />
                    <div>{wind}</div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
