import { useState } from "react";
import "./App.css";

import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import SearchHistory from "./components/SearchHistory";

function App() {
  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem("history")) || [];
  });

  const saveHistory = (city) => {
    const newHistory = [
      city,
      ...history.filter((item) => item !== city),
    ].slice(0, 5);

    setHistory(newHistory);

    localStorage.setItem(
      "history",
      JSON.stringify(newHistory)
    );
  };

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const response = await fetch(
        `https://wttr.in/${city}?format=j1`
      );

      if (!response.ok) {
        throw new Error("Không thể kết nối API");
      }

      const data = await response.json();

      const current = data.current_condition?.[0];

      if (!current) {
        throw new Error("Không tìm thấy dữ liệu");
      }

      setWeather({
        city,
        temp: current.temp_C,
        humidity: current.humidity,
        description: current.weatherDesc[0].value,
        icon: current.weatherIconUrl[0].value,
      });

      saveHistory(city);
    } catch (err) {
      setError("Không tìm thấy thành phố hoặc mất kết nối mạng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🌤 Weather App</h1>

      <SearchForm onSearch={fetchWeather} />

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Đang tải...</p>
        </div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {weather && (
        <WeatherCard weather={weather} />
      )}

      <SearchHistory
        history={history}
        onSearch={fetchWeather}
      />
    </div>
  );
}

export default App;