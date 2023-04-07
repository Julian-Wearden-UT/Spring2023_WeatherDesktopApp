import React, { useState } from "react";
import "./Weather.css";

function Weather() {
    const api={
        key: "f8e73a41b074b985b0f78b8950ecd426",
        url: "https://api.openweathermap.org/data/2.5/"
    }
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [isFetched, setIsFetched] = useState(false)

    const search =(evt)=>{
        if(evt.key === 'Enter') {
            fetch(`${api.url}weather?q=${query}&appid=${api.key}&units=imperial`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    setIsFetched(true);
                    console.log(result);
                });
        }
    }

    const getTodaysDate=(d)=>{
        const months=[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        const days = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];

        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        return `${day}, ${month} ${date}, ${year}`;
    }

    let weatherContainerTemplate = (temp, condition, city, country, icon=null) =>{
        return (
            <div className="Weather--Container">
                <div className="Weather--Temp">
                    {icon ? <img src={icon} className="Weather--Icon" alt="Weather Icon"/> : <div></div> }
                    {temp}°F
                </div>
                <div className="Weather--Condition">{condition}</div>
                <div className="Weather--City">{city}, {country}</div>
                <br/>
                <div className="Weather--Date">
                    {getTodaysDate(new Date())}
                </div>
                <br/>
            </div>
        )
    }

    let getIcon = () =>{
       return `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    }

    let updateWeatherContainer = () =>{
        if(weather.cod !== '401' && weather.cod !== '404') {
            return (
                weatherContainerTemplate(Math.round(weather.main.temp), weather.weather[0].main, weather.name, weather.sys.country, getIcon())
            )
        }
        else{
            return (
                weatherContainerTemplate(0, "Invalid City", "Invalid City", "Nowhere", "https://openweathermap.org/img/wn/01n@2x.png")
            )
        }

    }

    let defaultWeatherContainer = () => {
        return (
            weatherContainerTemplate(0, "No Data", "No City Entered", " ", "https://openweathermap.org/img/wn/01n@2x.png")
        )
    }


        return (
        <div className="Weather">
            <section className="Weather--Overlay">
                <input
                    type="text"
                    className="Weather--SearchBar" placeholder="Enter your city"
                    onChange={e=>setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}
                />
                {isFetched ? updateWeatherContainer(): defaultWeatherContainer()}
            </section>
        </div>
    );
}

export default Weather;