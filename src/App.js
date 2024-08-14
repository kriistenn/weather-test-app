import React, { useState, useEffect } from 'react';
import useWeather from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import RecentSearches from './components/RecentSearches';
import './App.css';

function App() {
  const { weatherData, error, loading, fetchWeather } = useWeather();
  const [unit, setUnit] = useState('metric');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem('recentSearches'));
    if (storedSearches && storedSearches.length > 0) {
      setRecentSearches(storedSearches);
      fetchWeather(storedSearches[0]);
    } else {
      fetchWeather('Bangkok');
      updateRecentSearches('Bangkok');
    }
  }, []);

  const updateRecentSearches = (city) => {
    setRecentSearches((prevSearches) => {
      const newSearches = [city, ...prevSearches.filter((c) => c !== city)];
      const updatedSearches = newSearches.slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  const handleSearch = async (city) => {
    const success = await fetchWeather(city);
    if (success) {
      updateRecentSearches(city);
    }
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    if (weatherData) {
      handleSearch(weatherData.name);
    }
  };

  return (
      <div className="container">
        <h1>Weather</h1>
        <SearchBar onSearch={handleSearch} />
        {loading ? (
            <div className="spinner"></div>
        ) : (
            <>
              {error && <p className="error">{error}</p>}
              <WeatherDisplay weatherData={weatherData} unit={unit} onUnitChange={handleUnitChange} />
            </>
        )}
        <RecentSearches recentSearches={recentSearches} onSearch={handleSearch} />
      </div>
  );
}

export default App;
