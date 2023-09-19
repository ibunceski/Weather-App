import React from "react";

const Forecast = (props) => {
    // const icons = props.data.daily.weathercode.map((icon) => {
    //     if(icon===0) return "01d.png";
    //     else if(icon===1) return "02d.png";
    //     else if(icon===2) return "03d.png";
    //     else if(icon===3) return "04d.png";
    //     else if(icon===45) return "50d.png";
    //     else if(icon===48) return "50d.png";
    //     else if(icon===51) return "09d.png";
    //     else if(icon===53) return "09d.png";
    //     else if(icon===55) return "09d.png";
    //     else if(icon===56) return "09d.png";
    //     else if(icon===57) return "09d.png";
    //     else if(icon===61) return "10d.png";
    //     else if(icon===63) return "10d.png";
    //     else if(icon===65) return "10d.png";
    //     else if(icon===66) return "10d.png";
    //     else if(icon===67) return "10d.png";
    //     else if(icon===71) return "13d.png";
    //     else if(icon===73) return "13d.png";
    //     else if(icon===75) return "13d.png";
    //     else if(icon===77) return "13d.png";
    //     else if(icon===80) return "10d.png";
    //     else if(icon===81) return "10d.png";
    //     else if(icon===82) return "11d.png";
    //     else if(icon===95) return "11d.png";
    //     else if(icon===96) return "11d.png";
    //     else if(icon===99) return "11d.png";
    // });

    const iconMappings = {
        0: "01d.png", 1: "02d.png", 2: "03d.png", 3: "04d.png", 45: "50d.png", 48: "50d.png",
        51: "09d.png", 53: "09d.png", 55: "09d.png", 56: "09d.png", 57: "09d.png", 61: "10d.png",
        63: "10d.png", 65: "10d.png", 66: "10d.png", 67: "10d.png", 71: "13d.png", 73: "13d.png",
        75: "13d.png", 77: "13d.png", 80: "10d.png", 81: "10d.png", 82: "11d.png", 95: "11d.png",
        96: "11d.png", 99: "11d.png",
    };

    const icons = props.data.daily.weathercode.map((icon) => iconMappings[icon]);

    const today = new Date();
    const nextFiveDays = [];

    for (let i = 0; i < 5; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i + 1);
        const dayName = nextDay.toLocaleDateString([], { weekday: 'long' });
        nextFiveDays.push({dayName});
    }

    // console.log(nextFiveDays);
    // const classesImages = (idx) =>{
    //     if(icons[idx] == '10d.png') return "rain--10d"
    //     else if(icons[idx] == '03d.png') return "rain--03d"
    // }
    

    return (
        <div className="forecast">
            <div className="forecast--card day1 day123">
                <h3 className="dayName">{nextFiveDays[0].dayName}</h3>
                <img className={`weather--icon--forecast`} src={`weather-icons/${icons[1]}`} alt="weather icon" />
                <h3 className="minMax--temp">{Math.round(props.data.daily.temperature_2m_max[1])}° | {Math.round(props.data.daily.temperature_2m_min[1])}°</h3>
            </div>
            <div className="forecast--card day2 day123">
                <h3 className="dayName">{nextFiveDays[1].dayName}</h3>
                <img className="weather--icon--forecast"src={`weather-icons/${icons[2]}`} alt="weather icon" />
                <h3 className="minMax--temp">{Math.round(props.data.daily.temperature_2m_max[2])}° | {Math.round(props.data.daily.temperature_2m_min[2])}°</h3>
            </div>
            <div className="forecast--card day3 day123">
                <h3 className="dayName">{nextFiveDays[2].dayName}</h3>
                <img className="weather--icon--forecast"src={`weather-icons/${icons[3]}`} alt="weather icon" />
                <h3 className="minMax--temp">{Math.round(props.data.daily.temperature_2m_max[3])}° | {Math.round(props.data.daily.temperature_2m_min[3])}°</h3>
            </div>
            <div className="forecast--card day4 day45">
                <h3 className="dayName">{nextFiveDays[3].dayName}</h3>
                <img className="weather--icon--forecast"src={`weather-icons/${icons[4]}`} alt="weather icon" />
                <h3 className="minMax--temp">{Math.round(props.data.daily.temperature_2m_max[4])}° | {Math.round(props.data.daily.temperature_2m_min[4])}°</h3>
            </div>
            <div className="forecast--card day5 day45">
                <h3 className="dayName">{nextFiveDays[4].dayName}</h3>
                <img className="weather--icon--forecast"src={`weather-icons/${icons[5]}`} alt="weather icon" />
                <h3 className="minMax--temp">{Math.round(props.data.daily.temperature_2m_max[5])}° | {Math.round(props.data.daily.temperature_2m_min[5])}°</h3>
            </div>
        </div>
    )
}

export default Forecast;