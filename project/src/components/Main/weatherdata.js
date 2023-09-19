import React from "react";
import Forecast from "./forecast";

const WeatherData = (props) => {
    let day = new Date().toLocaleDateString([], { weekday: 'long' });
    let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit", hour12: false });
    return (
        <div className="weather--data">
            <div className="weather--info">
                <div className="city--timeDay">
                    <div>
                        <h1 className="city">{props.data.name}, {props.data.sys.country}</h1>
                        <h4 className="description">{props.data.weather[0].main}</h4>
                    </div>
                    <h2 className="timeDay">{day}, {time}</h2>
                </div>
                <div className="left--currentTemp--icon">
                    <h1 className="currentTemp">{Math.round(props.data.main.temp)}°C</h1>
                    <img className="weather--icon" src={`weather-icons/${props.data.weather[0].icon}.png`} alt="weather icon" />
                </div>
                <div className="weather--stats">
                    <div className="feels--like">
                        <h4 className="feels--like--text stats--name">Feels like</h4>
                        <h4 className="feels--like--value stats--value">{Math.round(props.data.main.feels_like)}°C</h4>
                    </div>
                    <div className="humidity">
                        <h4 className="humidity--text stats--name">Humidity</h4>
                        <h4 className="humidity--value stats--value">{props.data.main.humidity}%</h4>
                    </div>
                    <div className="wind">
                        <h4 className="wind--text stats--name">Wind</h4>
                        <h4 className="wind--value stats--value">{props.data.wind.speed} m/s</h4>
                    </div>
                    <div className="pressure">
                        <h4 className="pressure--text stats--name">Pressure</h4>
                        <h4 className="pressure--value stats--value">{props.data.main.pressure} mb</h4>
                    </div>
                </div>
            </div>
            <Forecast data={props.forecastData}/>
        </div>
    )
}

export default WeatherData;