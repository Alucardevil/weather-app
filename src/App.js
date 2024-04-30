import React, { useState } from 'react';
import axios from 'axios';
import Weather from './Weather';
import './App.css';  // Ensure you have the CSS file linked here

function App() {
    const [cityInput, setCityInput] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const apiKey = '4f8bbefb55db94f45bd88601d1587067';  // Your OpenWeatherMap API key

    const fetchCities = (city) => {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${apiKey}`;
        axios.get(url)
            .then(response => setCities(response.data))
            .catch(error => console.error("Failed to fetch cities:", error));
    };

    const handleCityInput = (e) => {
        const value = e.target.value;
        setCityInput(value);
        if (value.length > 2) {
            fetchCities(value);
        } else {
            setCities([]);
        }
    };

    const handleSelectCity = (city) => {
        setSelectedCity(city);
        setCities([]);  // Clear suggestions after selection
    };

    return (
        <div className="App">
            <h2>Enter City</h2>
            <input
                type="text"
                value={cityInput}
                onChange={handleCityInput}
                placeholder="Start typing a city..."
            />
            <ul>
                {cities.map((city, index) => (
                    <li key={index} onClick={() => handleSelectCity(city)}>
                        {city.name}, {city.state ? `${city.state}, ` : ''}{city.country}
                    </li>
                ))}
            </ul>
            {selectedCity && (
                <Weather city={selectedCity.name} state={selectedCity.state} lat={selectedCity.lat} lon={selectedCity.lon} apiKey={apiKey} />
            )}
        </div>
    );
}

export default App;
