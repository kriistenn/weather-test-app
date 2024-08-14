import { useState } from 'react';
import axios from 'axios';

const API_KEY = 'a579391268c7939c6d6e3343fa0ee967';

const useWeather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async (city) => {
        setLoading(true);
        let success = false;

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            setError(null);
            success = true;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('City not found. Please try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
            setWeatherData(null);
        } finally {
            setLoading(false);
        }

        return success; // Возвращаем, было ли выполнение успешным
    };

    return {
        weatherData,
        error,
        loading,
        fetchWeather,
    };
};

export default useWeather;
