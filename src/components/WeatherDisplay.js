import React from 'react';

function WeatherDisplay({ weatherData, unit, onUnitChange }) {
    if (!weatherData) {
        return null; // Если нет данных, ничего не отображаем
    }

    const { name, main, weather, wind } = weatherData;
    const temperature = unit === 'metric' ? main.temp : (main.temp * 9/5) + 32;
    const unitSymbol = unit === 'metric' ? '°C' : '°F';

    return (
        <div className="weather-info">
            <h2>Weather in {name}</h2>
            <p>{weather[0].description}</p>
            <p>Temperature: {temperature.toFixed(1)} {unitSymbol}</p>
            <p>Wind Speed: {wind.speed} m/s</p>
            <button className="unit-toggle" onClick={() => onUnitChange(unit === 'metric' ? 'imperial' : 'metric')}>
                Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
            </button>
        </div>
    );
}

export default WeatherDisplay;
