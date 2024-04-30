import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather({ city, state, lat, lon, apiKey }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;  // Fahrenheit
        axios.get(url)
            .then(response => {
                setWeather(response.data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                setWeather(null);
            });
    }, [city, state, lat, lon, apiKey]);

    if (!weather) return <p>Loading weather data...</p>;

    return (
        <div>
            <h1>Weather Details for {city}{state ? `, ${state}` : ''}</h1>
            <p>Temperature: {weather.main.temp} °F</p>
            <p>Weather Condition: {weather.weather[0].main}</p>
            <p>Humidity: {weather.main.humidity}%</p>
        </div>
    );
}

export default Weather;
